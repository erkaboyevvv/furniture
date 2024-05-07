import { Module } from '@nestjs/common';
import { UserCardController } from './user_card.controller';
import { UserCardCrudService } from 'prisma/generated/testuchun/services/usercard.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserCardController],
  providers: [UserCardCrudService],
})
export class UserCardModule {}
