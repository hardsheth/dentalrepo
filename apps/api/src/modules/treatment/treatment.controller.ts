import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TreatmentService } from './treatment.service';

@ApiTags('treatment')
@Controller('treatment')
export class TreatmentController {
  constructor(private readonly service: TreatmentService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
