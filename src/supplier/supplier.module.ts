import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierCrudService } from 'prisma/generated/testuchun/services/supplier.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [SupplierController],
  providers: [SupplierCrudService],
  exports: [SupplierCrudService]
})
export class SupplierModule {}
