import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileStorageService } from './file-storage.service';

@ApiTags('file-storage')
@Controller('file-storage')
export class FileStorageController {
  constructor(private readonly service: FileStorageService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
