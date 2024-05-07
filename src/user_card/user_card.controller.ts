import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserCardInput, UpdateUserCardInput } from 'prisma/generated/testuchun/data/inputs/usercard.input';
import { UserCardCrudService } from 'prisma/generated/testuchun/services/usercard.crud.service';

@Controller('user-card')
export class UserCardController {
  constructor(private readonly userCardService: UserCardCrudService) {}

  @Post()
  create(@Body() createUserCardDto: CreateUserCardInput) {
    return this.userCardService.create(createUserCardDto);
  }

  @Get()
  findAll() {
    return this.userCardService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCardService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCardDto: UpdateUserCardInput) {
    return this.userCardService.update(+id, updateUserCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCardService.delete(+id);
  }
}
