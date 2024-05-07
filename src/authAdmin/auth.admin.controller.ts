import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Prisma } from '@prisma/client';
import { UserGuard } from 'src/guards/auth.guard';
import { LoginAuthDto, Tokens } from 'src/auth/dto';
import { AuthAdminService } from './auth.admin.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}

  @Post('signup')
  async signup(
    @Body() createAuthDto: Prisma.AdminsUncheckedCreateInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.authService.signup(createAuthDto, res);
  }

  @Post('login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.authService.login(loginAuthDto, res);
  }
  @UseGuards(AdminGuard)
  @Post('refresh/:id')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(+id, refreshToken, res);
  }

  @UseGuards(AdminGuard)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(refreshToken, res);
  }
}
