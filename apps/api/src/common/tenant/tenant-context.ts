import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class TenantContext {
  orgId?: string;
  clinicId?: string;
  userId?: string;
  role?: string;
}
