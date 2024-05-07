import { Module } from '@nestjs/common';
import { FurnitureCommentsController } from './furniture_comments.controller';
import { FurnitureCommentsCrudService } from 'prisma/generated/testuchun/services/furniturecomments.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FurnitureCommentsController],
  providers: [FurnitureCommentsCrudService],
})
export class FurnitureCommentsModule {}
