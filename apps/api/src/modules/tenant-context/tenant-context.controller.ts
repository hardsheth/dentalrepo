import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantContextService } from './tenant-context.service';

@ApiTags('tenant-context')
@Controller('tenant-context')
export class TenantContextController {
  constructor(private readonly service: TenantContextService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
