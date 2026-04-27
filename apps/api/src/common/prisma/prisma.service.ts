import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TenantContext } from '../tenant/tenant-context';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly tenantContext: TenantContext) {
    super();
  }

  ensureTenant(): { orgId: string; clinicId?: string } {
    if (!this.tenantContext.orgId) {
      throw new ForbiddenException('Missing tenant context');
    }
    return { orgId: this.tenantContext.orgId, clinicId: this.tenantContext.clinicId };
  }
}
