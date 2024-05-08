import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UpdateAdminsInput } from 'prisma/generated/testuchun/data/inputs/admins.input';
import { AdminsCrudService } from 'prisma/generated/testuchun/services/admins.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreatorGuard } from 'src/guards/creator.guard';
import { SelfAdminGuard } from 'src/guards/self.admin.guard';
import { SelfCreatorGuard } from 'src/guards/self.creator.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsCrudService) {}

  @UseGuards(CreatorGuard)
  @Get()
  findAll() {
    return this.adminsService.getAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.getById(+id);
  }

  // @UseGuards(CreatorGuards)
  // @UseGuards(SelfAdminGuard)
  @UseGuards(SelfAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminsInput) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @UseGuards(CreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.delete(+id);
  }
}
