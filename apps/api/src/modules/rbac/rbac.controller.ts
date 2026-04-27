import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RbacService } from './rbac.service';

@ApiTags('rbac')
@Controller('rbac')
export class RbacController {
  constructor(private readonly service: RbacService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
