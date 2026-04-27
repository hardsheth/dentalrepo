import { Test } from '@nestjs/testing';
import { AuditLogService } from './audit-log.service';

describe('AuditLogService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [AuditLogService] }).compile();
    const service = moduleRef.get(AuditLogService);
    expect(service.health().status).toBe('ok');
  });
});
