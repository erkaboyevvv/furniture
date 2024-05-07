import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePaymentInput, UpdatePaymentInput } from 'prisma/generated/testuchun/data/inputs/payment.input';
import { PaymentCrudService } from 'prisma/generated/testuchun/services/payment.crud.service';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentCrudService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentInput) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentInput) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.delete(+id);
  }
}
