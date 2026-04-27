import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TenantContext } from '../../common/tenant/tenant-context';
import { PrismaService } from '../../common/prisma/prisma.service';
import { TenantContextGuard } from './tenant-context.guard';

@Global()
@Module({
  providers: [
    TenantContext,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: TenantContextGuard,
    },
  ],
  exports: [TenantContext, PrismaService],
})
export class TenantContextModule {}
