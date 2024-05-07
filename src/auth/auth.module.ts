import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/common/strategies';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[JwtModule.register({}), PrismaModule , UsersModule , MailModule],
  controllers: [AuthController],
  providers: [AuthService , AccessTokenStrategy],
})
export class AuthModule {}
