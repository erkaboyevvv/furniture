import { Module } from '@nestjs/common';
import { FurnitureTypesController } from './furniture_types.controller';
import { FurnitureTypesCrudService } from 'prisma/generated/testuchun/services/furnituretypes.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FurnitureTypesController],
  providers: [FurnitureTypesCrudService],
})
export class FurnitureTypesModule {}
