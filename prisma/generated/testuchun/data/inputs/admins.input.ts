import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { IsString } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class AdminsInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birth_date: string;

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
  @IsBoolean()
  is_creator?: boolean;
}

export class CreateAdminsInput extends OmitType(AdminsInput, [] as const) {}

export class UpdateAdminsInput extends PartialType(CreateAdminsInput) {}
