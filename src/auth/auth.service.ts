import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, JwtPayload, UpdateAuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Tokens } from './types/tokens.types';
import { UsersCrudService } from 'prisma/generated/testuchun/services/users.crud.service';
import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { err } from 'neverthrow';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersCrudService,
    private readonly mailerService: MailService,
  ) {}
  async getTokens(userId: number, email: string): Promise<Tokens> {
    const user = await this.prismaService.users.findUnique({
      where: {
        id: userId,
      },
    });
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      is_active: user.is_active,
      role: 'user',
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.users.update({
      where: {
        id: userId,
      },
      data: {
        hashed_refresh_token: hashedRefreshToken,
      },
    });
  }

  async activate(link: string) {
    try {
      if (!link) {
        return new BadRequestException('Activation link not found');
      }

      const user = await this.prismaService.users.findFirst({
        where: {
          activation_link: link,
        },
      });

      if (!user) {
        return new BadRequestException('Invalid activation link');
      }

      if (user.is_active == true) {
        return new BadRequestException('User already activated');
      }

      const updatedUser = await this.prismaService.users.update({
        where: { id: user.id, is_active: false },
        data: {
          is_active: true,
        },
      });

      const response = {
        message: 'User activated successfully',
        patient: updatedUser.is_active,
      };
      return response;
    } catch (error) {
      return err(error);
    }
  }

  async signup(
    createUserDto: Prisma.UsersUncheckedCreateInput,
    res: Response,
  ): Promise<any> {
    const pass = await bcrypt.hash(createUserDto.hashed_password, 7);
    createUserDto.hashed_password = pass;

    const activation_link = v4();

    const newUser = await this.usersService.create({
      ...createUserDto,
      activation_link,
    });

    if (!newUser) {
      throw new InternalServerErrorException('Yangi user yaratishda xatolik');
    }

    const tokens = await this.getTokens(
      newUser._unsafeUnwrap().id,
      newUser._unsafeUnwrap().email,
    );
    await this.updateRefreshToken(
      newUser._unsafeUnwrap().id,
      tokens.refresh_token,
    );

    try {
      await this.mailerService.sendMailUser({
        email: newUser._unsafeUnwrap().email,
        full_name: newUser._unsafeUnwrap().full_name,
        activation_link: newUser._unsafeUnwrap().activation_link,
      });
    } catch (error) {
      throw new BadRequestException('Error sending email');
    }

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return tokens;
  }

  async login(loginDto: LoginAuthDto, res: Response): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });
    console.log(user);
    if (!user) {
      return new BadRequestException('User not found');
    }

    console.log(user.is_active);

    if (user.is_active == false) {
      return new BadRequestException('User not activated');
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.hashed_password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    return {
      message: 'User logged in',
      tokens,
    };
  }

  async refreshToken(
    userId: number,
    refreshToken: string,
    res: Response,
  ): Promise<any> {
    console.log(refreshToken);

    const decodedToken = await this.jwtService.decode(refreshToken);
    if (!decodedToken || userId !== decodedToken['sub']) {
      throw new BadRequestException('Invalid user or token');
    }

    const user = await this.prismaService.users.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('User not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user.id, user.email);

    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.prismaService.users.update({
      where: { id: user.id },
      data: { hashed_refresh_token: hashedRefreshToken },
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    return {
      message: 'User refreshed',
      user: updatedUser,
      tokens,
    };
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException();
    }

    console.log(userData);

    await this.prismaService.users.update({
      where: { id: userData.sub },
      data: { hashed_refresh_token: null },
    });

    res.clearCookie('refresh_token');

    return { message: 'User logged out successfully' };
  }

  async changePass(
    id: number,
    changePassDto: {
      old_password: string;
      password: string;
      confirm_password: string;
    },
  ) {
    const user = await this.prismaService.users.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return err(new BadRequestException('User not found'));
    }
    const isValidPassword = await bcrypt.compare(
      changePassDto.old_password,
      user.hashed_password,
    );

    if (!isValidPassword) {
      return err(new BadRequestException('Invalid password'));
    }

    if (changePassDto.password !== changePassDto.confirm_password) {
      return err(new BadRequestException("Passwords don't match"));
    }

    const pass = await bcrypt.hash(changePassDto.password, 7);
    await this.prismaService.users.update({
      where: {
        id: user.id,
      },
      data: {
        hashed_password: pass,
      },
    });

    return {
      message: 'Password changed successfully',
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
