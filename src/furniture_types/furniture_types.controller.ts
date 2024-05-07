import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateFurnitureTypesInput,
  UpdateFurnitureTypesInput,
} from 'prisma/generated/testuchun/data/inputs/furnituretypes.input';
import { FurnitureTypesCrudService } from 'prisma/generated/testuchun/services/furnituretypes.crud.service';

@Controller('furniture-types')
export class FurnitureTypesController {
  constructor(
    private readonly furnitureTypesService: FurnitureTypesCrudService,
  ) {}

  @Post()
  create(@Body() createFurnitureTypeDto: CreateFurnitureTypesInput) {
    return this.furnitureTypesService.create(createFurnitureTypeDto);
  }

  @Get()
  findAll() {
    return this.furnitureTypesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureTypesService.getById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureTypeDto: UpdateFurnitureTypesInput,
  ) {
    return this.furnitureTypesService.update(+id, updateFurnitureTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureTypesService.delete(+id);
  }
}
