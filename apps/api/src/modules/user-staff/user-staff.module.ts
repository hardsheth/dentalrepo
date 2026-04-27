import { Module } from '@nestjs/common';
import { UserStaffController } from './user-staff.controller';
import { UserStaffService } from './user-staff.service';

@Module({
  controllers: [UserStaffController],
  providers: [UserStaffService],
  exports: [UserStaffService],
})
export class UserStaffModule {}
