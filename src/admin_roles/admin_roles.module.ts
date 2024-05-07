import { Module } from '@nestjs/common';
import { AdminRolesController } from './admin_roles.controller';
import { AdminRolesCrudService } from 'prisma/generated/testuchun/services/adminroles.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminRolesController],
  providers: [AdminRolesCrudService],
})
export class AdminRolesModule {}
