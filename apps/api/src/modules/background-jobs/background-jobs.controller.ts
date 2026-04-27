import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BackgroundJobsService } from './background-jobs.service';

@ApiTags('background-jobs')
@Controller('background-jobs')
export class BackgroundJobsController {
  constructor(private readonly service: BackgroundJobsService) {}

  @Get('health')
  health(): { module: string; status: string } {
    return this.service.health();
  }
}
