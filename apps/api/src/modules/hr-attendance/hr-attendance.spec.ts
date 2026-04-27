import { Test } from '@nestjs/testing';
import { HrAttendanceService } from './hr-attendance.service';

describe('HrAttendanceService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [HrAttendanceService] }).compile();
    const service = moduleRef.get(HrAttendanceService);
    expect(service.health().status).toBe('ok');
  });
});
