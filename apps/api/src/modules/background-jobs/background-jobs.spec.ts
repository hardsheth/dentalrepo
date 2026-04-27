import { Test } from '@nestjs/testing';
import { BackgroundJobsService } from './background-jobs.service';

describe('BackgroundJobsService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [BackgroundJobsService] }).compile();
    const service = moduleRef.get(BackgroundJobsService);
    expect(service.health().status).toBe('ok');
  });
});
