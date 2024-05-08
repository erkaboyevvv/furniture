import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsCrudService } from 'prisma/generated/testuchun/services/materials.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [MaterialsController],
  providers: [MaterialsCrudService],
})
export class MaterialsModule {}
