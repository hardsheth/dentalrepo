import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TenantContextModule } from './modules/tenant-context/tenant-context.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { OrgClinicModule } from './modules/org-clinic/org-clinic.module';
import { UserStaffModule } from './modules/user-staff/user-staff.module';
import { PatientModule } from './modules/patient/patient.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { TreatmentModule } from './modules/treatment/treatment.module';
import { BillingModule } from './modules/billing/billing.module';
import { DynamicBillingRulesModule } from './modules/dynamic-billing-rules/dynamic-billing-rules.module';
import { HrAttendanceModule } from './modules/hr-attendance/hr-attendance.module';
import { HrPayrollModule } from './modules/hr-payroll/hr-payroll.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FileStorageModule } from './modules/file-storage/file-storage.module';
import { BackgroundJobsModule } from './modules/background-jobs/background-jobs.module';
import { AuditLogModule } from './modules/audit-log/audit-log.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TenantContextModule,
    AuthModule,
    RbacModule,
    OrgClinicModule,
    UserStaffModule,
    PatientModule,
    AppointmentModule,
    TreatmentModule,
    BillingModule,
    DynamicBillingRulesModule,
    HrAttendanceModule,
    HrPayrollModule,
    NotificationsModule,
    FileStorageModule,
    BackgroundJobsModule,
    AuditLogModule,
    ReportingModule,
    HealthModule,
  ],
})
export class AppModule {}
