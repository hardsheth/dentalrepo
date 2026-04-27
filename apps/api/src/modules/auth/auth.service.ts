import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';

type TokenPayload = { accessToken: string; refreshToken: string; jti: string; family: string };

@Injectable()
export class AuthService {
  private revokedJtis = new Set<string>();
  private revokedFamilies = new Set<string>();
  private jtiFamily = new Map<string, string>();

  login(userId: string): TokenPayload {
    const family = randomUUID();
    const jti = randomUUID();
    this.jtiFamily.set(jti, family);
    return { accessToken: `access-${userId}-${jti}`, refreshToken: `refresh-${userId}-${jti}`, jti, family };
  }

  rotate(jti: string, userId: string): TokenPayload {
    const family = this.jtiFamily.get(jti);
    if (!family) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    if (this.revokedJtis.has(jti)) {
      this.revokedFamilies.add(family);
      throw new UnauthorizedException('Refresh token reuse detected');
    }
    if (this.revokedFamilies.has(family)) {
      throw new UnauthorizedException('Token family revoked');
    }

    this.revokedJtis.add(jti);
    const nextJti = randomUUID();
    this.jtiFamily.set(nextJti, family);
    return {
      accessToken: `access-${userId}-${nextJti}`,
      refreshToken: `refresh-${userId}-${nextJti}`,
      jti: nextJti,
      family,
    };
  }

  logout(jti: string): { revoked: boolean } {
    this.revokedJtis.add(jti);
    return { revoked: true };
  }
}
