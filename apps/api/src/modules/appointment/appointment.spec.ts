import { Test } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [AppointmentService] }).compile();
    const service = moduleRef.get(AppointmentService);
    expect(service.health().status).toBe('ok');
  });
});
