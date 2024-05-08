import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ColorsModule } from './colors/colors.module';
import { AdminsModule } from './admins/admins.module';
import { MaterialsModule } from './materials/materials.module';
import { FurnitureTypesModule } from './furniture_types/furniture_types.module';
import { RoomTypesModule } from './room_types/room_types.module';
import { FurniturePhotosModule } from './furniture_photos/furniture_photos.module';
import { FurnitureModule } from './furniture/furniture.module';
import { AuthModule } from './auth/auth.module';
import { AuthAdminModule } from './authAdmin/auth.admin.module';
import { AuthSupplierModule } from './authSupplier/auth.supplier.module';
import { UserCardModule } from './user_card/user_card.module';
import { UserAddressModule } from './user_address/user_address.module';
import { ContractsDetailingModule } from './contracts_detailing/contracts_detailing.module';
import { SupplierModule } from './supplier/supplier.module';
import { ContractsModule } from './contracts/contracts.module';
import { PaymentModule } from './payment/payment.module';
import { RolesModule } from './roles/roles.module';
import { AdminRolesModule } from './admin_roles/admin_roles.module';
import { FurnitureLikesModule } from './furniture_likes/furniture_likes.module';
import { FurnitureCommentsModule } from './furniture_comments/furniture_comments.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule,
    PrismaModule,
    ColorsModule,
    AdminsModule,
    MaterialsModule,
    FurnitureTypesModule,
    RoomTypesModule,
    FurniturePhotosModule,
    FurnitureModule,
    AuthModule,
    AuthAdminModule,
    AuthSupplierModule,
    UserCardModule,
    UserAddressModule,
    ContractsDetailingModule,
    SupplierModule,
    ContractsModule,
    PaymentModule,
    RolesModule,
    AdminRolesModule,
    FurnitureLikesModule,
    FurnitureCommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
