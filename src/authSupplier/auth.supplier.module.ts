import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../common/strategies';
import { AuthSupplierController } from './auth.supplier.controller';
import { AuthSupplierService } from './auth.supplier.service';
import { AdminsModule } from '../admins/admins.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [JwtModule, PrismaModule],
  controllers: [AuthSupplierController],
  providers: [AuthSupplierService, AccessTokenStrategy],
})
export class AuthSupplierModule {}
