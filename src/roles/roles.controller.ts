import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRolesInput, UpdateRolesInput } from 'prisma/generated/testuchun/data/inputs/roles.input';
import { RolesCrudService } from 'prisma/generated/testuchun/services/roles.crud.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesCrudService) {}

  @Post()
  create(@Body() createRoleDto: CreateRolesInput) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRolesInput) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.delete(+id);
  }
}
