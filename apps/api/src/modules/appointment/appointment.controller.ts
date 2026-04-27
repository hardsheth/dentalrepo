import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
