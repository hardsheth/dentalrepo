import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RbacService {
  private readonly logger = new Logger(RbacService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'rbac', status: 'ok' };
  }
}
