import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsCrudService } from 'prisma/generated/testuchun/services/admins.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [AdminsController],
  providers: [AdminsCrudService],
  exports: [AdminsCrudService]
})
export class AdminsModule {}
