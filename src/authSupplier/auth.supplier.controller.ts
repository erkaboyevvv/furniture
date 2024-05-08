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
import { Prisma } from '@prisma/client';
import { LoginAuthDto, Tokens } from '../auth/dto';
import { AuthSupplierService } from './auth.supplier.service';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';

@Controller('auth/supplier')
export class AuthSupplierController {
  constructor(private readonly authService: AuthSupplierService) {}

  @Post('signup')
  async signup(
    @Body() createAuthDto: Prisma.SupplierUncheckedCreateInput,
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
  // @UseGuards(AdminGuard)
  @Post('refresh/:id')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(+id, refreshToken, res);
  }

  // @UseGuards(AdminGuard)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(refreshToken, res);
  }
}
