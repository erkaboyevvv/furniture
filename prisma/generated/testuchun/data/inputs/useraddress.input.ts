import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsNotEmpty} from 'class-validator';
import {IsOptional} from 'class-validator';
import {IsString} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class UserAddressInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  users_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  area: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  house: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apartment_or_office: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  entrance?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  floor?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  intercom_code?: string;
}


export class CreateUserAddressInput extends OmitType(UserAddressInput, [] as const) {}


export class UpdateUserAddressInput extends PartialType(CreateUserAddressInput) {}

