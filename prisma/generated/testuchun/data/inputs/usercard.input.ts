import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsString, IsPhoneNumber } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class UserCardInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  users_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  card_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  card_expiration: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;
}

export class CreateUserCardInput extends OmitType(UserCardInput, [] as const) {}

export class UpdateUserCardInput extends PartialType(CreateUserCardInput) {}
