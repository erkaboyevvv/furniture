import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesCrudService } from 'prisma/generated/testuchun/services/roles.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RolesController],
  providers: [RolesCrudService],
})
export class RolesModule {}
