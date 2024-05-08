import { Module } from '@nestjs/common';
import { FurnitureCommentsController } from './furniture_comments.controller';
import { FurnitureCommentsCrudService } from 'prisma/generated/testuchun/services/furniturecomments.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [FurnitureCommentsController],
  providers: [FurnitureCommentsCrudService],
})
export class FurnitureCommentsModule {}
