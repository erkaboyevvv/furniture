import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminRolesInput, UpdateAdminRolesInput } from 'prisma/generated/testuchun/data/inputs/adminroles.input';
import { AdminRolesCrudService } from 'prisma/generated/testuchun/services/adminroles.crud.service';
import { CreatorGuard } from 'src/guards/creator.guard';

@ApiTags('admin-roles')
@Controller('admin-roles')
export class AdminRolesController {
  constructor(private readonly adminRolesService: AdminRolesCrudService) {}

  @UseGuards(CreatorGuard)
  @Post()
  create(@Body() createAdminRoleDto: CreateAdminRolesInput) {
    return this.adminRolesService.create(createAdminRoleDto);
  }

  @UseGuards(CreatorGuard)
  @Get()
  findAll() {
    return this.adminRolesService.getAll();
  }

  @UseGuards(CreatorGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminRolesService.getById(+id);
  }

  @UseGuards(CreatorGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminRoleDto: UpdateAdminRolesInput,
  ) {
    return this.adminRolesService.update(+id, updateAdminRoleDto);
  }

  @UseGuards(CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminRolesService.delete(+id);
  }
}
