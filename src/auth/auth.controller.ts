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
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginAuthDto, Tokens } from './dto';
import { Public } from '../common/decorators';
import { AccessTokenGuard } from '../common/guards';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Prisma } from '@prisma/client';
import { UserGuard } from 'src/guards/user.guard';
import { SelfUserGuard } from 'src/guards/self.user.guard';

@Controller('auth/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createAuthDto: Prisma.UsersUncheckedCreateInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.authService.signup(createAuthDto, res);
  }

  @Get('activate/:activate_link')
  async activate(@Param('activate_link') activate_link: string) {
    return this.authService.activate(activate_link);
  }

  @Post('login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.authService.login(loginAuthDto, res);
  }
  @UseGuards(SelfUserGuard)
  @Post('refresh/:id')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(+id, refreshToken, res);
  }

  @UseGuards(SelfUserGuard)
  @Post('change-password/:id')
  async changePass(
    @Body()
    changePassDto: {
      old_password: string;
      password: string;
      confirm_password: string;
    },
    @Param('id') id: number,
  ) {
    return this.authService.changePass(id, changePassDto);
  }

  @UseGuards(UserGuard)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(refreshToken, res);
  }
}
