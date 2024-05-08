import { Module } from '@nestjs/common';
import { UserCardController } from './user_card.controller';
import { UserCardCrudService } from 'prisma/generated/testuchun/services/usercard.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [UserCardController],
  providers: [UserCardCrudService],
})
export class UserCardModule {}
