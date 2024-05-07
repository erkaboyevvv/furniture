import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateContractsDetailingInput, UpdateContractsDetailingInput } from 'prisma/generated/testuchun/data/inputs/contractsdetailing.input';
import { ContractsDetailingCrudService } from 'prisma/generated/testuchun/services/contractsdetailing.crud.service';

@Controller('contracts-detailing')
export class ContractsDetailingController {
  constructor(private readonly contractsDetailingService: ContractsDetailingCrudService) {}

  @Post()
  create(@Body() createContractsDetailingDto: CreateContractsDetailingInput) {
    return this.contractsDetailingService.create(createContractsDetailingDto);
  }

  @Get()
  findAll() {
    return this.contractsDetailingService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsDetailingService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractsDetailingDto: UpdateContractsDetailingInput) {
    return this.contractsDetailingService.update(+id, updateContractsDetailingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsDetailingService.delete(+id);
  }
}
