import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateFurnitureLikesInput, UpdateFurnitureLikesInput } from 'prisma/generated/testuchun/data/inputs/furniturelikes.input';
import { FurnitureLikesCrudService } from 'prisma/generated/testuchun/services/furniturelikes.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserGuard } from 'src/guards/user.guard';

@Controller('furniture-likes')
export class FurnitureLikesController {
  constructor(
    private readonly furnitureLikesService: FurnitureLikesCrudService,
  ) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createFurnitureLikeDto: CreateFurnitureLikesInput) {
    return this.furnitureLikesService.like(createFurnitureLikeDto);
  }

  @Get()
  findAll() {
    return this.furnitureLikesService.getAll();
  }

  @UseGuards(UseGuards)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureLikesService.getById(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureLikeDto: UpdateFurnitureLikesInput,
  ) {
    return this.furnitureLikesService.update(+id, updateFurnitureLikeDto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureLikesService.delete(+id);
  }
}
