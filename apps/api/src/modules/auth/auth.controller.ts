import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response): { accessToken: string; jti: string } {
    const tokens = this.authService.login(dto.email);
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    return { accessToken: tokens.accessToken, jti: tokens.jti };
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto, @Res({ passthrough: true }) response: Response): { accessToken: string; jti: string } {
    const tokens = this.authService.rotate(dto.jti, 'user');
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    return { accessToken: tokens.accessToken, jti: tokens.jti };
  }

  @Post('logout')
  logout(@Body() dto: RefreshDto): { revoked: boolean } {
    return this.authService.logout(dto.jti);
  }
}
