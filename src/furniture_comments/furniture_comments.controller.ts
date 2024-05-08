import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateFurnitureCommentsInput, UpdateFurnitureCommentsInput } from 'prisma/generated/testuchun/data/inputs/furniturecomments.input';
import { FurnitureCommentsCrudService } from 'prisma/generated/testuchun/services/furniturecomments.crud.service';
import { UserGuard } from 'src/guards/user.guard';

@Controller('furniture-comments')
export class FurnitureCommentsController {
  constructor(private readonly furnitureCommentsService: FurnitureCommentsCrudService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createFurnitureCommentDto: CreateFurnitureCommentsInput) {
    return this.furnitureCommentsService.create(createFurnitureCommentDto);
  }

  @Get()
  findAll() {
    return this.furnitureCommentsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureCommentsService.getById(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFurnitureCommentDto: UpdateFurnitureCommentsInput) {
    return this.furnitureCommentsService.update(+id, updateFurnitureCommentDto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureCommentsService.delete(+id);
  }
}
