import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersCrudService } from 'prisma/generated/testuchun/services/users.crud.service';
import { Prisma } from '@prisma/client';
import { SelfUserGuard } from 'src/guards/self.user.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserGuard } from 'src/guards/user.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersCrudService) {}

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @UseGuards(SelfUserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }
  @UseGuards(SelfUserGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UsersUpdateInput,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(SelfUserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
