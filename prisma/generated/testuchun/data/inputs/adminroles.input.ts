import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class AdminRolesInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  admins_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  roles_id: number;
}

export class CreateAdminRolesInput extends OmitType(
  AdminRolesInput,
  [] as const,
) {}

export class UpdateAdminRolesInput extends PartialType(CreateAdminRolesInput) {}
