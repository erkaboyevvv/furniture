import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreatePaymentInput, UpdatePaymentInput } from 'prisma/generated/testuchun/data/inputs/payment.input';
import { PaymentCrudService } from 'prisma/generated/testuchun/services/payment.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreatorGuard } from 'src/guards/creator.guard';
import { UserGuard } from 'src/guards/user.guard';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentCrudService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentInput) {
    return this.paymentService.create(createPaymentDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.paymentService.getAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.getById(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentInput,
  ) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @UseGuards(CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.delete(+id);
  }
}
