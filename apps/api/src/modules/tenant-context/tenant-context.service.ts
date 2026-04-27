import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TenantContextService {
  private readonly logger = new Logger(TenantContextService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'tenant-context', status: 'ok' };
  }
}
