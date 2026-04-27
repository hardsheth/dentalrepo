import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserStaffService {
  private readonly logger = new Logger(UserStaffService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'user-staff', status: 'ok' };
  }
}
