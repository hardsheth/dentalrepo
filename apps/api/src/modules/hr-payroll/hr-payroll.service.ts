import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HrPayrollService {
  private readonly logger = new Logger(HrPayrollService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'hr-payroll', status: 'ok' };
  }
}
