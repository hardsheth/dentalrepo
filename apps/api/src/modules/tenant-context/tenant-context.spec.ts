import { Test } from '@nestjs/testing';
import { TenantContextService } from './tenant-context.service';

describe('TenantContextService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [TenantContextService] }).compile();
    const service = moduleRef.get(TenantContextService);
    expect(service.health().status).toBe('ok');
  });
});
