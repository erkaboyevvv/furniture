import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateFurnitureInput, UpdateFurnitureInput } from 'prisma/generated/testuchun/data/inputs/furniture.input';
import { FurnitureCrudService } from 'prisma/generated/testuchun/services/furniture.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureCrudService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createFurnitureDto: CreateFurnitureInput) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  findAll() {
    return this.furnitureService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureService.getById(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureDto: Prisma.FurnitureUncheckedCreateInput,
  ) {
    return this.furnitureService.update(+id, updateFurnitureDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureService.delete(+id);
  }
}
