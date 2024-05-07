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
import { JwtService } from '@nestjs/jwt';
import { err } from 'neverthrow';
import { CreateAuthDto, JwtPayloadAdmin, JwtPayloadSupplier, LoginAuthDto, Tokens, UpdateAuthDto } from '../auth/dto';
import { SupplierCrudService } from 'prisma/generated/testuchun/services/supplier.crud.service';

@Injectable()
export class AuthSupplierService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async getTokens(SupplierId: number, email: string): Promise<Tokens> {
    const Supplier = await this.prismaService.supplier.findUnique({
      where: {
        id: SupplierId,
      },
    });
    const jwtPayload: JwtPayloadSupplier = {
      sub: SupplierId,
      email: email,
      supplier: Supplier,
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

  async updateRefreshToken(SupplierId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.supplier.update({
      where: {
        id: SupplierId,
      },
      data: {
        hashed_refresh_token: hashedRefreshToken,
      },
    });
  }

  async signup(
    createSupplierDto: Prisma.SupplierUncheckedCreateInput,
    res: Response,
  ): Promise<any> {
    const pass = await bcrypt.hash(createSupplierDto.hashed_password, 7);
    console.log(pass);
    
    createSupplierDto.hashed_password = pass;

    const find = await this.prismaService.supplier.findUnique({
      where: {email: createSupplierDto.email}
    })

    if (find) {
      return err(new BadRequestException("User already created"))
    }

    const newSupplier = await this.prismaService.supplier.create({data: createSupplierDto});

    // console.log(newSupplier);
    

    if (!newSupplier) {
      return err(new InternalServerErrorException('Yangi Supplier yaratishda xatolik'));
    }

    const tokens = await this.getTokens(
      newSupplier.id,
      newSupplier.email,
    );
    await this.updateRefreshToken(
      newSupplier.id,
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
    const Supplier = await this.prismaService.supplier.findUnique({
      where: { email },
    });
    console.log(Supplier);
    if (!Supplier) {
      return new BadRequestException('Supplier not found');
    }

    const isValidPassword = await bcrypt.compare(
      password, 
      Supplier.hashed_password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = await this.getTokens(Supplier.id, Supplier.email);
    await this.updateRefreshToken(Supplier.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    return {
      message: 'Supplier logged in',
      tokens,
    };
  }

  async refreshToken(
    SupplierId: number,
    refreshToken: string,
    res: Response,
  ): Promise<any> {
    console.log(refreshToken);

    const decodedToken = await this.jwtService.decode(refreshToken);
    if (!decodedToken || SupplierId !== decodedToken['sub']) {
      throw new BadRequestException('Invalid Supplier or token');
    }

    const Supplier = await this.prismaService.supplier.findUnique({
      where: { id: SupplierId },
    });

    if (!Supplier || !Supplier.hashed_refresh_token) {
      throw new BadRequestException('Supplier not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      Supplier.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(Supplier.id, Supplier.email);

    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedSupplier = await this.prismaService.supplier.update({
      where: { id: Supplier.id },
      data: { hashed_refresh_token: hashedRefreshToken },
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    return {
      message: 'Supplier refreshed',
      Supplier: updatedSupplier,
      tokens,
    };
  }

  async logout(refreshToken: string, res: Response) {
    const Supplier = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!Supplier) {
      throw new ForbiddenException();
    }

    console.log(Supplier);

    await this.prismaService.supplier.update({
      where: { id: Supplier.sub },
      data: { hashed_refresh_token: null },
    });

    res.clearCookie('refresh_token');

    return { message: 'Supplier logged out successfully' };
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
