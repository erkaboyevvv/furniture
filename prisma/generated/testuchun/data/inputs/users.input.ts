import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsStrongPassword } from 'class-validator';
import { IsString } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class UsersInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsDateString()
  birth_date?: Date;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('UZ')
  phone_number?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hashed_password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  activation_link?: string;
}

export class CreateUsersInput extends OmitType(UsersInput, [] as const) {}

export class UpdateUsersInput extends PartialType(CreateUsersInput) {}
