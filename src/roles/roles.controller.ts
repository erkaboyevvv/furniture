import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateRolesInput, UpdateRolesInput } from 'prisma/generated/testuchun/data/inputs/roles.input';
import { RolesCrudService } from 'prisma/generated/testuchun/services/roles.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreatorGuard } from 'src/guards/creator.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesCrudService) {}

  @UseGuards(CreatorGuard)
  @Post()
  create(@Body() createRoleDto: CreateRolesInput) {
    return this.rolesService.create(createRoleDto);
  }

  @UseGuards(CreatorGuard)
  @Get()
  findAll() {
    return this.rolesService.getAll();
  }

  @UseGuards(CreatorGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.getById(+id);
  }

  @UseGuards(CreatorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRolesInput) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @UseGuards(CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.delete(+id);
  }
}
