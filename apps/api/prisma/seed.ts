import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const org = await prisma.organization.create({
    data: {
      name: 'Demo Dental Org',
      clinic: {
        create: {
          name: 'Demo Dental Clinic',
          address: '123 Main St',
          phone: '+10000000000',
          email: 'clinic@example.com',
          timezone: 'America/New_York',
          workingHours: [{ dayOfWeek: 1, startTime: '09:00', endTime: '18:00' }],
          chairCount: 5,
        },
      },
    },
    include: { clinic: true },
  });

  if (!org.clinic) return;

  await prisma.user.create({
    data: {
      orgId: org.id,
      clinicId: org.clinic.id,
      email: 'admin@demo.com',
      firstName: 'Clinic',
      lastName: 'Admin',
      role: Role.CLINIC_ADMIN,
    },
  });
}

void main().finally(async () => {
  await prisma.$disconnect();
});
