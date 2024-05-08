import { Module } from '@nestjs/common';
import { FurnitureLikesController } from './furniture_likes.controller';
import { FurnitureLikesCrudService } from 'prisma/generated/testuchun/services/furniturelikes.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [FurnitureLikesController],
  providers: [FurnitureLikesCrudService],
})
export class FurnitureLikesModule {}
