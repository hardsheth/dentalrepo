import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TreatmentService {
  private readonly logger = new Logger(TreatmentService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'treatment', status: 'ok' };
  }
}
