import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function ensureOrgWithClinic(input: {
  orgName: string;
  clinicName: string;
  clinicEmail: string;
  timezone: string;
  chairCount: number;
}): Promise<{ orgId: string; clinicId: string }> {
  const existing = await prisma.organization.findFirst({
    where: { name: input.orgName },
    include: { clinic: true },
  });

  if (existing?.clinic) {
    return { orgId: existing.id, clinicId: existing.clinic.id };
  }

  const org = await prisma.organization.create({
    data: {
      name: input.orgName,
      clinic: {
        create: {
          name: input.clinicName,
          address: '123 Main St',
          phone: '+10000000000',
          email: input.clinicEmail,
          timezone: input.timezone,
          workingHours: [
            { dayOfWeek: 1, startTime: '09:00', endTime: '18:00' },
            { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' },
            { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' },
            { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' },
            { dayOfWeek: 5, startTime: '09:00', endTime: '18:00' },
          ],
          chairCount: input.chairCount,
        },
      },
    },
    include: { clinic: true },
  });

  if (!org.clinic) {
    throw new Error('Clinic provisioning failed during seed');
  }

  return { orgId: org.id, clinicId: org.clinic.id };
}

async function upsertUser(params: {
  orgId: string;
  clinicId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}): Promise<void> {
  await prisma.user.upsert({
    where: { orgId_email: { orgId: params.orgId, email: params.email } },
    update: {
      firstName: params.firstName,
      lastName: params.lastName,
      role: params.role,
      isActive: true,
    },
    create: {
      orgId: params.orgId,
      clinicId: params.clinicId,
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      role: params.role,
      isActive: true,
    },
  });
}

async function main(): Promise<void> {
  // Global / platform superadmin tenant.
  const platform = await ensureOrgWithClinic({
    orgName: 'Dental Platform Org',
    clinicName: 'Dental Platform Admin Clinic',
    clinicEmail: 'platform-clinic@example.com',
    timezone: 'UTC',
    chairCount: 1,
  });

  await upsertUser({
    orgId: platform.orgId,
    clinicId: platform.clinicId,
    email: 'superadmin@dental.local',
    firstName: 'Super',
    lastName: 'Admin',
    role: Role.SUPERADMIN,
  });

  // Demo tenant used for local development.
  const demo = await ensureOrgWithClinic({
    orgName: 'Demo Dental Org',
    clinicName: 'Demo Dental Clinic',
    clinicEmail: 'clinic@example.com',
    timezone: 'America/New_York',
    chairCount: 5,
  });

  await upsertUser({
    orgId: demo.orgId,
    clinicId: demo.clinicId,
    email: 'admin@demo.com',
    firstName: 'Clinic',
    lastName: 'Admin',
    role: Role.CLINIC_ADMIN,
  });

  await upsertUser({
    orgId: demo.orgId,
    clinicId: demo.clinicId,
    email: 'dentist@demo.com',
    firstName: 'Ava',
    lastName: 'Dentist',
    role: Role.DENTIST,
  });

  await upsertUser({
    orgId: demo.orgId,
    clinicId: demo.clinicId,
    email: 'reception@demo.com',
    firstName: 'Rita',
    lastName: 'Reception',
    role: Role.RECEPTIONIST,
  });
}

void main().finally(async () => {
  await prisma.$disconnect();
});
