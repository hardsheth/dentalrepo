import { Test } from '@nestjs/testing';
import { RbacService } from './rbac.service';

describe('RbacService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [RbacService] }).compile();
    const service = moduleRef.get(RbacService);
    expect(service.health().status).toBe('ok');
  });
});
