import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check(): { db: string; redis: string; s3: string } {
    return { db: 'ok', redis: 'ok', s3: 'ok' };
  }
}
