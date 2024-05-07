import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { CreateAuthDto, JwtPayloadAdmin, LoginAuthDto, Tokens, UpdateAuthDto } from 'src/auth/dto';
import { AdminsCrudService } from 'prisma/generated/testuchun/services/admins.crud.service';
import { JwtService } from '@nestjs/jwt';
import { err } from 'neverthrow';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}
  async getTokens(adminId: number, email: string): Promise<Tokens> {
    const admin = await this.prismaService.admins.findUnique({
      where: {
        id: adminId,
      },
    });
    const jwtPayload: JwtPayloadAdmin = {
      sub: adminId,
      email: email,
      admin: admin,
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

  async updateRefreshToken(adminId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.admins.update({
      where: {
        id: adminId,
      },
      data: {
        hashed_refresh_token: hashedRefreshToken,
      },
    });
  }

  async signup(
    createAdminDto: Prisma.AdminsUncheckedCreateInput,
    res: Response,
  ): Promise<any> {
    const pass = await bcrypt.hash(createAdminDto.hashed_password, 7);
    createAdminDto.hashed_password = pass;

    const find = await this.prismaService.admins.findUnique({
      where: {email: createAdminDto.email}
    })

    if (find) {
      return err(new BadRequestException("User already created"))
    }

    const newAdmin = await this.prismaService.admins.create({data: createAdminDto});

    console.log(newAdmin);
    

    if (!newAdmin) {
      return err(new InternalServerErrorException('Yangi admin yaratishda xatolik'));
    }

    const tokens = await this.getTokens(
      newAdmin.id,
      newAdmin.email,
    );
    await this.updateRefreshToken(
      newAdmin.id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return tokens;
  }

  async login(loginDto: LoginAuthDto, res: Response): Promise<any> {
    const { email, password } = loginDto;
    const admin = await this.prismaService.admins.findUnique({
      where: { email },
    });
    console.log(admin);
    if (!admin) {
      return new BadRequestException('Admin not found');
    }

    const isValidPassword = await bcrypt.compare(
      password, 
      admin.hashed_password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = await this.getTokens(admin.id, admin.email);
    await this.updateRefreshToken(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    return {
      message: 'Admin logged in',
      tokens,
    };
  }

  async refreshToken(
    adminId: number,
    refreshToken: string,
    res: Response,
  ): Promise<any> {
    console.log(refreshToken);

    const decodedToken = await this.jwtService.decode(refreshToken);
    if (!decodedToken || adminId !== decodedToken['sub']) {
      throw new BadRequestException('Invalid admin or token');
    }

    const admin = await this.prismaService.admins.findUnique({
      where: { id: adminId },
    });

    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(admin.id, admin.email);

    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.prismaService.admins.update({
      where: { id: admin.id },
      data: { hashed_refresh_token: hashedRefreshToken },
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    return {
      message: 'Admin refreshed',
      admin: updatedAdmin,
      tokens,
    };
  }

  async logout(refreshToken: string, res: Response) {
    const admin = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!admin) {
      throw new ForbiddenException();
    }

    console.log(admin);

    await this.prismaService.admins.update({
      where: { id: admin.sub },
      data: { hashed_refresh_token: null },
    });

    res.clearCookie('refresh_token');

    return { message: 'Admin logged out successfully' };
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
