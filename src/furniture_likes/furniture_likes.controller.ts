import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateFurnitureLikesInput, UpdateFurnitureLikesInput } from 'prisma/generated/testuchun/data/inputs/furniturelikes.input';
import { FurnitureLikesCrudService } from 'prisma/generated/testuchun/services/furniturelikes.crud.service';

@Controller('furniture-likes')
export class FurnitureLikesController {
  constructor(private readonly furnitureLikesService: FurnitureLikesCrudService) {}

  @Post()
  create(@Body() createFurnitureLikeDto: CreateFurnitureLikesInput) {
    return this.furnitureLikesService.like(createFurnitureLikeDto);
  }

  @Get()
  findAll() {
    return this.furnitureLikesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureLikesService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFurnitureLikeDto: UpdateFurnitureLikesInput) {
    return this.furnitureLikesService.update(+id, updateFurnitureLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureLikesService.delete(+id);
  }
}
