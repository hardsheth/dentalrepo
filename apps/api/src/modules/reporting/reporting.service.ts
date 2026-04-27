import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ReportingService {
  private readonly logger = new Logger(ReportingService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'reporting', status: 'ok' };
  }
}
