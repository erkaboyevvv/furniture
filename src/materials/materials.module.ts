import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsCrudService } from 'prisma/generated/testuchun/services/materials.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MaterialsController],
  providers: [MaterialsCrudService],
})
export class MaterialsModule {}
