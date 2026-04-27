import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'patient', status: 'ok' };
  }
}
