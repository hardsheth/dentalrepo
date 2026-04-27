import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrgClinicService {
  private readonly logger = new Logger(OrgClinicService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'org-clinic', status: 'ok' };
  }
}
