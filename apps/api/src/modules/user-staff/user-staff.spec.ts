import { Test } from '@nestjs/testing';
import { UserStaffService } from './user-staff.service';

describe('UserStaffService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [UserStaffService] }).compile();
    const service = moduleRef.get(UserStaffService);
    expect(service.health().status).toBe('ok');
  });
});
