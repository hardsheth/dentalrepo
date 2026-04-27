import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('detects refresh token reuse', async () => {
    const moduleRef = await Test.createTestingModule({ providers: [AuthService] }).compile();
    const service = moduleRef.get(AuthService);

    const login = service.login('u1');
    service.rotate(login.jti, 'u1');
    expect(() => service.rotate(login.jti, 'u1')).toThrow();
  });
});
