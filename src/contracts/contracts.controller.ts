import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateContractsInput, UpdateContractsInput } from 'prisma/generated/testuchun/data/inputs/contracts.input';
import { ContractsCrudService } from 'prisma/generated/testuchun/services/contracts.crud.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsCrudService) {}

  @Post()
  create(@Body() createContractDto: CreateContractsInput) {
    return this.contractsService.create(createContractDto);
  }

  @Get()
  findAll() {
    return this.contractsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractsInput) {
    return this.contractsService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.delete(+id);
  }
}
