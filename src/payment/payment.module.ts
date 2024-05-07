import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentCrudService } from 'prisma/generated/testuchun/services/payment.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentController],
  providers: [PaymentCrudService],
})
export class PaymentModule {}
