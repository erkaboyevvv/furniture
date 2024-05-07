import { Module } from '@nestjs/common';
import { FurnitureController } from './furniture.controller';
import { FurnitureCrudService } from 'prisma/generated/testuchun/services/furniture.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FurnitureController],
  providers: [FurnitureCrudService],
})
export class FurnitureModule {}
