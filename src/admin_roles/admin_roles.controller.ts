import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAdminRolesInput, UpdateAdminRolesInput } from 'prisma/generated/testuchun/data/inputs/adminroles.input';
import { AdminRolesCrudService } from 'prisma/generated/testuchun/services/adminroles.crud.service';

@Controller('admin-roles')
export class AdminRolesController {
  constructor(private readonly adminRolesService: AdminRolesCrudService) {}

  @Post()
  create(@Body() createAdminRoleDto: CreateAdminRolesInput) {
    return this.adminRolesService.create(createAdminRoleDto);
  }

  @Get()
  findAll() {
    return this.adminRolesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminRolesService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminRoleDto: UpdateAdminRolesInput) {
    return this.adminRolesService.update(+id, updateAdminRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminRolesService.delete(+id);
  }
}
