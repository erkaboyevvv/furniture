import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateContractsDetailingInput, UpdateContractsDetailingInput } from 'prisma/generated/testuchun/data/inputs/contractsdetailing.input';
import { ContractsDetailingCrudService } from 'prisma/generated/testuchun/services/contractsdetailing.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserGuard } from 'src/guards/user.guard';

@Controller('contracts-detailing')
export class ContractsDetailingController {
  constructor(
    private readonly contractsDetailingService: ContractsDetailingCrudService,
  ) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createContractsDetailingDto: CreateContractsDetailingInput) {
    return this.contractsDetailingService.create(createContractsDetailingDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.contractsDetailingService.getAll();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsDetailingService.getById(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractsDetailingDto: UpdateContractsDetailingInput,
  ) {
    return this.contractsDetailingService.update(
      +id,
      updateContractsDetailingDto,
    );
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsDetailingService.delete(+id);
  }
}
