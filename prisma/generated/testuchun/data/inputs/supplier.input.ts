import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsNotEmpty} from 'class-validator';
import { IsString, IsEmail , IsPhoneNumber } from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class SupplierInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number_1: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number_2: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  car_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hashed_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  car_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  car_size: string;
}


export class CreateSupplierInput extends OmitType(SupplierInput, [] as const) {}


export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {}

