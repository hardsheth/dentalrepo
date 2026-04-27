import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
