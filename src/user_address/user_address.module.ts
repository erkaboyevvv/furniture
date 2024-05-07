import { Module } from '@nestjs/common';
import { UserAddressController } from './user_address.controller';
import { UserAddressCrudService } from 'prisma/generated/testuchun/services/useraddress.crud.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserAddressController],
  providers: [UserAddressCrudService],
})
export class UserAddressModule {}
