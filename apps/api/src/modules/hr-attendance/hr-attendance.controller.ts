import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HrAttendanceService } from './hr-attendance.service';

@ApiTags('hr-attendance')
@Controller('hr-attendance')
export class HrAttendanceController {
  constructor(private readonly service: HrAttendanceService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
