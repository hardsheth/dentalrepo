import { Module } from '@nestjs/common';
import { OrgClinicController } from './org-clinic.controller';
import { OrgClinicService } from './org-clinic.service';

@Module({
  controllers: [OrgClinicController],
  providers: [OrgClinicService],
  exports: [OrgClinicService],
})
export class OrgClinicModule {}
