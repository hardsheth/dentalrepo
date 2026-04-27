import { Global, Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RbacController } from './rbac.controller';
import { RbacService } from './rbac.service';
import { RbacGuard } from './rbac.guard';

@Global()
@Module({
  controllers: [RbacController],
  providers: [RbacService, Reflector, { provide: APP_GUARD, useClass: RbacGuard }],
  exports: [RbacService],
})
export class RbacModule {}
