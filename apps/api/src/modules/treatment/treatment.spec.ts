import { Test } from '@nestjs/testing';
import { TreatmentService } from './treatment.service';

describe('TreatmentService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [TreatmentService] }).compile();
    const service = moduleRef.get(TreatmentService);
    expect(service.health().status).toBe('ok');
  });
});
