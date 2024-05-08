import { Module } from '@nestjs/common';
import { FurniturePhotosController } from './furniture_photos.controller';
import { FurniturePhotosCrudService } from 'prisma/generated/testuchun/services/furniturephotos.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [FurniturePhotosController],
  providers: [FurniturePhotosCrudService],
})
export class FurniturePhotosModule {}
