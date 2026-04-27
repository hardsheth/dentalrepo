import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_PERMISSIONS, SUPERADMIN_BLOCKED_PERMISSIONS } from './permissions';

export const PERMISSIONS_KEY = 'permissions';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [];

    if (!permissions.length) {
      return true;
    }

    const req = context.switchToHttp().getRequest<{ user?: { role?: string; permissions?: string[]; permissionOverrides?: Record<string, boolean> } }>();
    const role = req.user?.role;
    if (!role) {
      throw new ForbiddenException('Role is missing');
    }

    const basePermissions = new Set(ROLE_PERMISSIONS[role] ?? []);
    const overrides = req.user?.permissionOverrides ?? {};
    Object.entries(overrides).forEach(([key, granted]) => {
      if (granted) basePermissions.add(key);
      else basePermissions.delete(key);
    });

    if (role === 'SUPERADMIN' && permissions.some((p) => SUPERADMIN_BLOCKED_PERMISSIONS.includes(p))) {
      throw new ForbiddenException('Superadmin boundary violation');
    }

    const allowed = permissions.every((permission) => basePermissions.has(permission));
    if (!allowed) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
