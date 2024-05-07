import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/common/strategies';
import { AuthAdminController } from './auth.admin.controller';
import { AuthAdminService } from './auth.admin.service';
import { AdminsModule } from 'src/admins/admins.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [JwtModule.register({}), PrismaModule, AdminsModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, AccessTokenStrategy],
})
export class AuthAdminModule {}
