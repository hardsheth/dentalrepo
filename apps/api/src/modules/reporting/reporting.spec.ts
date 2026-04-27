import { Test } from '@nestjs/testing';
import { ReportingService } from './reporting.service';

describe('ReportingService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [ReportingService] }).compile();
    const service = moduleRef.get(ReportingService);
    expect(service.health().status).toBe('ok');
  });
});
