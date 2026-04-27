import { Test } from '@nestjs/testing';
import { DynamicBillingRulesService } from './dynamic-billing-rules.service';

describe('DynamicBillingRulesService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [DynamicBillingRulesService] }).compile();
    const service = moduleRef.get(DynamicBillingRulesService);
    expect(service.health().status).toBe('ok');
  });
});
