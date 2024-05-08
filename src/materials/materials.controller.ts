import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateMaterialsInput, UpdateMaterialsInput } from 'prisma/generated/testuchun/data/inputs/materials.input';
import { MaterialsCrudService } from 'prisma/generated/testuchun/services/materials.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsCrudService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialsInput) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  findAll() {
    return this.materialsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.getById(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialsInput) {
    return this.materialsService.update(+id, updateMaterialDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.delete(+id);
  }
}
