import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HrPayrollService } from './hr-payroll.service';

@ApiTags('hr-payroll')
@Controller('hr-payroll')
export class HrPayrollController {
  constructor(private readonly service: HrPayrollService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
