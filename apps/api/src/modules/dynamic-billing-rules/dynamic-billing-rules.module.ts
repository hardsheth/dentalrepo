import { Module } from '@nestjs/common';
import { DynamicBillingRulesController } from './dynamic-billing-rules.controller';
import { DynamicBillingRulesService } from './dynamic-billing-rules.service';

@Module({
  controllers: [DynamicBillingRulesController],
  providers: [DynamicBillingRulesService],
  exports: [DynamicBillingRulesService],
})
export class DynamicBillingRulesModule {}
