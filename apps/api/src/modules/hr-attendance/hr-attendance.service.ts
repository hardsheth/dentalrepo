import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HrAttendanceService {
  private readonly logger = new Logger(HrAttendanceService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'hr-attendance', status: 'ok' };
  }
}
