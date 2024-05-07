import { Module } from '@nestjs/common';
import { RoomTypesController } from './room_types.controller';
import { RoomTypesCrudService } from 'prisma/generated/testuchun/services/roomtypes.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoomTypesController],
  providers: [RoomTypesCrudService],
})
export class RoomTypesModule {}
