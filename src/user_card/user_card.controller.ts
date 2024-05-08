import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserCardInput, UpdateUserCardInput } from 'prisma/generated/testuchun/data/inputs/usercard.input';
import { UserCardCrudService } from 'prisma/generated/testuchun/services/usercard.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { SelfUserGuard } from 'src/guards/self.user.guard';
import { UserGuard } from 'src/guards/user.guard';

@Controller('user-card')
export class UserCardController {
  constructor(private readonly userCardService: UserCardCrudService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createUserCardDto: CreateUserCardInput) {
    return this.userCardService.create(createUserCardDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userCardService.getAll();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCardService.getById(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCardDto: UpdateUserCardInput,
  ) {
    return this.userCardService.update(+id, updateUserCardDto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCardService.delete(+id);
  }
}
