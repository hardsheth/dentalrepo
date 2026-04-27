import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuditLogService {
  private readonly logger = new Logger(AuditLogService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'audit-log', status: 'ok' };
  }
}
