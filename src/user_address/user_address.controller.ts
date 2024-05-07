import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserAddressInput, UpdateUserAddressInput } from 'prisma/generated/testuchun/data/inputs/useraddress.input';
import { UserAddressCrudService } from 'prisma/generated/testuchun/services/useraddress.crud.service';

@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressCrudService) {}

  @Post()
  create(@Body() createUserAddressDto: CreateUserAddressInput) {
    return this.userAddressService.create(createUserAddressDto);
  }

  @Get()
  findAll() {
    return this.userAddressService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAddressService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressInput) {
    return this.userAddressService.update(+id, updateUserAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAddressService.delete(+id);
  }
}
