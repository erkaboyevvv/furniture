import { Module } from '@nestjs/common';
import { ColorsController } from './colors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ColorsCrudService } from 'prisma/generated/testuchun/services/colors.crud.service';

@Module({
  imports: [PrismaModule],
  controllers: [ColorsController],
  providers: [ColorsCrudService],
})
export class ColorsModule {}
