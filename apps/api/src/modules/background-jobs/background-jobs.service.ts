import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BackgroundJobsService {
  private readonly logger = new Logger(BackgroundJobsService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'background-jobs', status: 'ok' };
  }
}
