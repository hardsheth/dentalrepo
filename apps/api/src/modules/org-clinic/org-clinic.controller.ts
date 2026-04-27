import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrgClinicService } from './org-clinic.service';

@ApiTags('org-clinic')
@Controller('org-clinic')
export class OrgClinicController {
  constructor(private readonly service: OrgClinicService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
