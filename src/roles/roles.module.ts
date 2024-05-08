import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesCrudService } from 'prisma/generated/testuchun/services/roles.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule , JwtModule],
  controllers: [RolesController],
  providers: [RolesCrudService],
})
export class RolesModule {}
