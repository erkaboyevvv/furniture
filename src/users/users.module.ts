import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersCrudService } from 'prisma/generated/testuchun/services/users.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [UsersController],
  providers: [UsersCrudService],
  exports: [UsersCrudService]
})
export class UsersModule {}
