import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'billing', status: 'ok' };
  }
}
