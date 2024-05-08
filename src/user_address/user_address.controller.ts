import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserAddressInput, UpdateUserAddressInput } from 'prisma/generated/testuchun/data/inputs/useraddress.input';
import { UserAddressCrudService } from 'prisma/generated/testuchun/services/useraddress.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { SelfUserGuard } from 'src/guards/self.user.guard';
import { UserGuard } from 'src/guards/user.guard';

@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressCrudService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createUserAddressDto: CreateUserAddressInput) {
    return this.userAddressService.create(createUserAddressDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userAddressService.getAll();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAddressService.getById(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressInput) {
    return this.userAddressService.update(+id, updateUserAddressDto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAddressService.delete(+id);
  }
}
