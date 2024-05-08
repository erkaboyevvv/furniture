import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateRoomTypesInput, UpdateRoomTypesInput } from 'prisma/generated/testuchun/data/inputs/roomtypes.input';
import { RoomTypesCrudService } from 'prisma/generated/testuchun/services/roomtypes.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('room-types')
export class RoomTypesController {
  constructor(private readonly roomTypesService: RoomTypesCrudService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createRoomTypeDto: CreateRoomTypesInput) {
    return this.roomTypesService.create(createRoomTypeDto);
  }

  @Get()
  findAll() {
    return this.roomTypesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomTypesService.getById(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomTypeDto: UpdateRoomTypesInput) {
    return this.roomTypesService.update(+id, updateRoomTypeDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomTypesService.delete(+id);
  }
}
