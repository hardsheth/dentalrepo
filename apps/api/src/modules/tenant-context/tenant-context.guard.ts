import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TenantContext } from '../../common/tenant/tenant-context';

const PUBLIC_PATHS = ['/api/v1/auth/login', '/api/v1/auth/refresh', '/api/v1/auth/forgot-password', '/api/v1/auth/reset-password', '/api/v1/health'];

@Injectable()
export class TenantContextGuard implements CanActivate {
  constructor(private readonly tenantContext: TenantContext) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: Record<string, string> }>();
    if (PUBLIC_PATHS.includes(request.path)) {
      return true;
    }

    const orgId = request.user?.orgId;
    if (!orgId) {
      throw new ForbiddenException('Missing orgId in token');
    }

    this.tenantContext.orgId = orgId;
    this.tenantContext.clinicId = request.user?.clinicId;
    this.tenantContext.userId = request.user?.sub;
    this.tenantContext.role = request.user?.role;

    return true;
  }
}
