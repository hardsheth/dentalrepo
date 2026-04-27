-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'CLINIC_ADMIN', 'DENTIST', 'RECEPTIONIST', 'HR_MANAGER', 'BILLING_STAFF', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('draft', 'issued', 'partially_paid', 'paid', 'void');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cash', 'card', 'upi', 'insurance', 'bank_transfer');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('percent', 'fixed');

-- CreateEnum
CREATE TYPE "LeaveRequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "gstNumber" TEXT,
    "licenseNumber" TEXT,
    "logoUrl" TEXT,
    "workingHours" JSONB NOT NULL,
    "chairCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "invitedAt" TIMESTAMP(3),
    "inviteAcceptedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "jti" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserClinicMembership" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserClinicMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermissionOverride" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "granted" BOOLEAN NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPermissionOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffAvailability" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "bloodGroup" TEXT,
    "allergies" TEXT[],
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "existingConditions" JSONB,
    "previousDentalWork" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientConsent" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "consentedAt" TIMESTAMP(3) NOT NULL,
    "collectedBy" TEXT NOT NULL,
    "consentGiven" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatientConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientNote" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "appointmentId" TEXT,
    "authorId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatientNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "startAtUtc" TIMESTAMP(3) NOT NULL,
    "endAtUtc" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentWaitlist" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    "preferredDateRange" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppointmentWaitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    "clinicalNotes" TEXT NOT NULL,
    "toothNumbers" INTEGER[],
    "materialsUsed" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentProcedure" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "treatmentId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TreatmentProcedure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCatalogItem" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "taxRate" DECIMAL(5,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceCatalogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicPriceOverride" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClinicPriceOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingRule" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "priority" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "condition" JSONB NOT NULL,
    "action" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BillingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "appointmentId" TEXT,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'draft',
    "subtotal" DECIMAL(12,2) NOT NULL,
    "taxTotal" DECIMAL(12,2) NOT NULL,
    "discountTotal" DECIMAL(12,2) NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceLineItem" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceId" TEXT,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "discountType" "DiscountType",
    "discountValue" DECIMAL(10,2),
    "taxRate" DECIMAL(5,2) NOT NULL,
    "lineTotal" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvoiceLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "referenceNumber" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "recordedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "linkedEntityType" TEXT NOT NULL,
    "linkedEntityId" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveType" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "annualQuota" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaveType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "leaveTypeId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "LeaveRequestStatus" NOT NULL DEFAULT 'pending',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveBalance" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "leaveTypeId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "balance" DECIMAL(8,2) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceLog" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attendanceDate" TIMESTAMP(3) NOT NULL,
    "checkInAt" TIMESTAMP(3),
    "checkOutAt" TIMESTAMP(3),
    "overriddenBy" TEXT,
    "overrideReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttendanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollCycle" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayrollCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollRun" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayrollRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollItem" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "baseSalary" DECIMAL(12,2) NOT NULL,
    "allowances" DECIMAL(12,2) NOT NULL,
    "deductions" DECIMAL(12,2) NOT NULL,
    "overtimePay" DECIMAL(12,2) NOT NULL,
    "tax" DECIMAL(12,2) NOT NULL,
    "leaveWithoutPay" DECIMAL(12,2) NOT NULL,
    "netPay" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayrollItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payslip" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "payrollItemId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payslip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationLog" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "clinicId" TEXT,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "before" JSONB,
    "after" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_orgId_key" ON "Organization"("orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_orgId_key" ON "Clinic"("orgId");

-- CreateIndex
CREATE INDEX "Clinic_orgId_idx" ON "Clinic"("orgId");

-- CreateIndex
CREATE INDEX "User_orgId_clinicId_idx" ON "User"("orgId", "clinicId");

-- CreateIndex
CREATE UNIQUE INDEX "User_orgId_email_key" ON "User"("orgId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_jti_key" ON "RefreshToken"("jti");

-- CreateIndex
CREATE INDEX "RefreshToken_orgId_clinicId_userId_idx" ON "RefreshToken"("orgId", "clinicId", "userId");

-- CreateIndex
CREATE INDEX "RefreshToken_family_idx" ON "RefreshToken"("family");

-- CreateIndex
CREATE INDEX "UserClinicMembership_orgId_clinicId_idx" ON "UserClinicMembership"("orgId", "clinicId");

-- CreateIndex
CREATE UNIQUE INDEX "UserClinicMembership_orgId_clinicId_userId_key" ON "UserClinicMembership"("orgId", "clinicId", "userId");

-- CreateIndex
CREATE INDEX "UserPermissionOverride_orgId_clinicId_userId_idx" ON "UserPermissionOverride"("orgId", "clinicId", "userId");

-- CreateIndex
CREATE INDEX "StaffAvailability_orgId_clinicId_userId_dayOfWeek_idx" ON "StaffAvailability"("orgId", "clinicId", "userId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "Patient_orgId_clinicId_deletedAt_idx" ON "Patient"("orgId", "clinicId", "deletedAt");

-- CreateIndex
CREATE INDEX "PatientConsent_orgId_clinicId_patientId_idx" ON "PatientConsent"("orgId", "clinicId", "patientId");

-- CreateIndex
CREATE INDEX "PatientNote_orgId_clinicId_patientId_idx" ON "PatientNote"("orgId", "clinicId", "patientId");

-- CreateIndex
CREATE INDEX "Appointment_orgId_clinicId_dentistId_startAtUtc_idx" ON "Appointment"("orgId", "clinicId", "dentistId", "startAtUtc");

-- CreateIndex
CREATE INDEX "Appointment_orgId_clinicId_status_deletedAt_idx" ON "Appointment"("orgId", "clinicId", "status", "deletedAt");

-- CreateIndex
CREATE INDEX "AppointmentWaitlist_orgId_clinicId_dentistId_idx" ON "AppointmentWaitlist"("orgId", "clinicId", "dentistId");

-- CreateIndex
CREATE INDEX "Treatment_orgId_clinicId_appointmentId_idx" ON "Treatment"("orgId", "clinicId", "appointmentId");

-- CreateIndex
CREATE INDEX "TreatmentProcedure_orgId_clinicId_treatmentId_idx" ON "TreatmentProcedure"("orgId", "clinicId", "treatmentId");

-- CreateIndex
CREATE INDEX "ServiceCatalogItem_orgId_clinicId_category_idx" ON "ServiceCatalogItem"("orgId", "clinicId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCatalogItem_orgId_clinicId_code_key" ON "ServiceCatalogItem"("orgId", "clinicId", "code");

-- CreateIndex
CREATE INDEX "ClinicPriceOverride_orgId_clinicId_serviceId_idx" ON "ClinicPriceOverride"("orgId", "clinicId", "serviceId");

-- CreateIndex
CREATE INDEX "BillingRule_orgId_clinicId_active_priority_idx" ON "BillingRule"("orgId", "clinicId", "active", "priority");

-- CreateIndex
CREATE INDEX "Invoice_orgId_clinicId_status_deletedAt_idx" ON "Invoice"("orgId", "clinicId", "status", "deletedAt");

-- CreateIndex
CREATE INDEX "InvoiceLineItem_orgId_clinicId_invoiceId_idx" ON "InvoiceLineItem"("orgId", "clinicId", "invoiceId");

-- CreateIndex
CREATE INDEX "Payment_orgId_clinicId_invoiceId_idx" ON "Payment"("orgId", "clinicId", "invoiceId");

-- CreateIndex
CREATE INDEX "File_orgId_clinicId_linkedEntityType_linkedEntityId_idx" ON "File"("orgId", "clinicId", "linkedEntityType", "linkedEntityId");

-- CreateIndex
CREATE INDEX "LeaveType_orgId_clinicId_idx" ON "LeaveType"("orgId", "clinicId");

-- CreateIndex
CREATE INDEX "LeaveRequest_orgId_clinicId_userId_status_idx" ON "LeaveRequest"("orgId", "clinicId", "userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveBalance_orgId_clinicId_userId_leaveTypeId_year_key" ON "LeaveBalance"("orgId", "clinicId", "userId", "leaveTypeId", "year");

-- CreateIndex
CREATE INDEX "AttendanceLog_orgId_clinicId_userId_attendanceDate_idx" ON "AttendanceLog"("orgId", "clinicId", "userId", "attendanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "PayrollCycle_orgId_clinicId_month_year_key" ON "PayrollCycle"("orgId", "clinicId", "month", "year");

-- CreateIndex
CREATE INDEX "PayrollRun_orgId_clinicId_cycleId_status_idx" ON "PayrollRun"("orgId", "clinicId", "cycleId", "status");

-- CreateIndex
CREATE INDEX "PayrollItem_orgId_clinicId_runId_userId_idx" ON "PayrollItem"("orgId", "clinicId", "runId", "userId");

-- CreateIndex
CREATE INDEX "Payslip_orgId_clinicId_payrollItemId_idx" ON "Payslip"("orgId", "clinicId", "payrollItemId");

-- CreateIndex
CREATE INDEX "NotificationLog_orgId_clinicId_channel_status_idx" ON "NotificationLog"("orgId", "clinicId", "channel", "status");

-- CreateIndex
CREATE INDEX "AuditLog_orgId_createdAt_idx" ON "AuditLog"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_orgId_entityType_entityId_idx" ON "AuditLog"("orgId", "entityType", "entityId");

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientConsent" ADD CONSTRAINT "PatientConsent_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientNote" ADD CONSTRAINT "PatientNote_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentProcedure" ADD CONSTRAINT "TreatmentProcedure_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLineItem" ADD CONSTRAINT "InvoiceLineItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollItem" ADD CONSTRAINT "PayrollItem_runId_fkey" FOREIGN KEY ("runId") REFERENCES "PayrollRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
