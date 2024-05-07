import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsCrudService } from 'prisma/generated/testuchun/services/contracts.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContractsController],
  providers: [ContractsCrudService],
})
export class ContractsModule {}
