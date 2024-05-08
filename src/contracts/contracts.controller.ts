import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateContractsInput, UpdateContractsInput } from 'prisma/generated/testuchun/data/inputs/contracts.input';
import { ContractsCrudService } from 'prisma/generated/testuchun/services/contracts.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserGuard } from 'src/guards/user.guard';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsCrudService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createContractDto: CreateContractsInput) {
    return this.contractsService.create(createContractDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.contractsService.getAll();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.getById(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractsInput,
  ) {
    return this.contractsService.update(+id, updateContractDto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.delete(+id);
  }
}
