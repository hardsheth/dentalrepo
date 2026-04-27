import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserStaffService } from './user-staff.service';

@ApiTags('user-staff')
@Controller('user-staff')
export class UserStaffController {
  constructor(private readonly service: UserStaffService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
