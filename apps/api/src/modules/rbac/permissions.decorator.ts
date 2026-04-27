import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from './rbac.guard';

export const Permissions = (...permissions: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(PERMISSIONS_KEY, permissions);
