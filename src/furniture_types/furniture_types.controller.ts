import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  CreateFurnitureTypesInput,
  UpdateFurnitureTypesInput,
} from 'prisma/generated/testuchun/data/inputs/furnituretypes.input';
import { FurnitureTypesCrudService } from 'prisma/generated/testuchun/services/furnituretypes.crud.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('furniture-types')
export class FurnitureTypesController {
  constructor(
    private readonly furnitureTypesService: FurnitureTypesCrudService,
  ) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureTypeDto: UpdateFurnitureTypesInput,
  ) {
    return this.furnitureTypesService.update(+id, updateFurnitureTypeDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureTypesService.delete(+id);
  }
}
