import { Test } from '@nestjs/testing';
import { FileStorageService } from './file-storage.service';

describe('FileStorageService', () => {
  it('returns health', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [FileStorageService] }).compile();
    const service = moduleRef.get(FileStorageService);
    expect(service.health().status).toBe('ok');
  });
});
