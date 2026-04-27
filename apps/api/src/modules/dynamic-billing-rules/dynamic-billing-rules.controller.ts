import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DynamicBillingRulesService } from './dynamic-billing-rules.service';

@ApiTags('dynamic-billing-rules')
@Controller('dynamic-billing-rules')
export class DynamicBillingRulesController {
  constructor(private readonly service: DynamicBillingRulesService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
