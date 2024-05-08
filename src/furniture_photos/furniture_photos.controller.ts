import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FurniturePhotosCrudService } from 'prisma/generated/testuchun/services/furniturephotos.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('furniture-photos')
export class FurniturePhotosController {
  constructor(
    private readonly furniturePhotosService: FurniturePhotosCrudService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createFurniturePhotoDto: Prisma.FurniturePhotosUncheckedCreateInput,
  ) {
    return this.furniturePhotosService.create(createFurniturePhotoDto);
  }

  @Get()
  findAll() {
    return this.furniturePhotosService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furniturePhotosService.getById(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurniturePhotoDto: Prisma.FurniturePhotosUncheckedUpdateInput,
  ) {
    return this.furniturePhotosService.update(+id, updateFurniturePhotoDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furniturePhotosService.delete(+id);
  }
}
