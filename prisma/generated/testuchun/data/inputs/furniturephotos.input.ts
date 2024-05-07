import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsString, IsUrl } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class FurniturePhotosInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  furniture_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  caption: string;
}

export class CreateFurniturePhotosInput extends OmitType(
  FurniturePhotosInput,
  [] as const,
) {}

export class UpdateFurniturePhotosInput extends PartialType(
  CreateFurniturePhotosInput,
) {}
