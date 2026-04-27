import { Test } from '@nestjs/testing';
import { OrgClinicService } from './org-clinic.service';

describe('OrgClinicService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [OrgClinicService] }).compile();
    const service = moduleRef.get(OrgClinicService);
    expect(service.health().status).toBe('ok');
  });
});
