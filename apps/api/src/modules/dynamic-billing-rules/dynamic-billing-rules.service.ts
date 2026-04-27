import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DynamicBillingRulesService {
  private readonly logger = new Logger(DynamicBillingRulesService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'dynamic-billing-rules', status: 'ok' };
  }
}
