import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateSupplierInput, UpdateSupplierInput } from 'prisma/generated/testuchun/data/inputs/supplier.input';
import { SupplierCrudService } from 'prisma/generated/testuchun/services/supplier.crud.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierCrudService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierInput) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierInput) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.delete(+id);
  }
}
