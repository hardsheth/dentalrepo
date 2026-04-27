import { Test } from '@nestjs/testing';
import { HrPayrollService } from './hr-payroll.service';

describe('HrPayrollService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [HrPayrollService] }).compile();
    const service = moduleRef.get(HrPayrollService);
    expect(service.health().status).toBe('ok');
  });
});
