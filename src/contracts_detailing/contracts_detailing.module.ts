import { Module } from '@nestjs/common';
import { ContractsDetailingController } from './contracts_detailing.controller';
import { ContractsDetailingCrudService } from 'prisma/generated/testuchun/services/contractsdetailing.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [ContractsDetailingController],
  providers: [ContractsDetailingCrudService],
})
export class ContractsDetailingModule {}
