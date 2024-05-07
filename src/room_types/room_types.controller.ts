import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRoomTypesInput, UpdateRoomTypesInput } from 'prisma/generated/testuchun/data/inputs/roomtypes.input';
import { RoomTypesCrudService } from 'prisma/generated/testuchun/services/roomtypes.crud.service';

@Controller('room-types')
export class RoomTypesController {
  constructor(private readonly roomTypesService: RoomTypesCrudService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomTypeDto: UpdateRoomTypesInput) {
    return this.roomTypesService.update(+id, updateRoomTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomTypesService.delete(+id);
  }
}
