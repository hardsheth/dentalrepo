import { Test } from '@nestjs/testing';
import { BillingService } from './billing.service';

describe('BillingService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [BillingService] }).compile();
    const service = moduleRef.get(BillingService);
    expect(service.health().status).toBe('ok');
  });
});
