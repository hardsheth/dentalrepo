import { Test } from '@nestjs/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [PatientService] }).compile();
    const service = moduleRef.get(PatientService);
    expect(service.health().status).toBe('ok');
  });
});
