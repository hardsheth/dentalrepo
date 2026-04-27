import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(AppointmentService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'appointment', status: 'ok' };
  }
}
