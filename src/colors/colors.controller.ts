import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateColorsInput, UpdateColorsInput } from 'prisma/generated/testuchun/data/inputs/colors.input';
import { ColorsCrudService } from 'prisma/generated/testuchun/services/colors.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsCrudService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createColorDto: CreateColorsInput) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorsService.getById(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorsInput) {
    return this.colorsService.update(+id, updateColorDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsService.delete(+id);
  }
}
