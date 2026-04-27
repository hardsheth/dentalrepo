import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FileStorageService {
  private readonly logger = new Logger(FileStorageService.name);

  health(): { module: string; status: string } {
    this.logger.debug('health check');
    return { module: 'file-storage', status: 'ok' };
  }
}
