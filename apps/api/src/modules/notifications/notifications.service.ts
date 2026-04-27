import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'notifications', status: 'ok' };
  }
}
