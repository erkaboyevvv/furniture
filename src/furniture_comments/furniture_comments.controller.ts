import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateFurnitureCommentsInput, UpdateFurnitureCommentsInput } from 'prisma/generated/testuchun/data/inputs/furniturecomments.input';
import { FurnitureCommentsCrudService } from 'prisma/generated/testuchun/services/furniturecomments.crud.service';

@Controller('furniture-comments')
export class FurnitureCommentsController {
  constructor(private readonly furnitureCommentsService: FurnitureCommentsCrudService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFurnitureCommentDto: UpdateFurnitureCommentsInput) {
    return this.furnitureCommentsService.update(+id, updateFurnitureCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureCommentsService.delete(+id);
  }
}
