import { Test } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [NotificationsService] }).compile();
    const service = moduleRef.get(NotificationsService);
    expect(service.health().status).toBe('ok');
  });
});
