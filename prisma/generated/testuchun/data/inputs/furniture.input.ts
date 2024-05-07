import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class FurnitureInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  produced_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  colors_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  materials_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  roomTypes_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  furniture_types_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  width: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class CreateFurnitureInput extends OmitType(
  FurnitureInput,
  [] as const,
) {}

export class UpdateFurnitureInput extends PartialType(CreateFurnitureInput) {}
