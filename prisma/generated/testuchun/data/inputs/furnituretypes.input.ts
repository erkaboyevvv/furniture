import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { IsDefined } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class FurnitureTypesInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateFurnitureTypesInput extends OmitType(
  FurnitureTypesInput,
  [] as const,
) {}

export class UpdateFurnitureTypesInput extends PartialType(
  CreateFurnitureTypesInput,
) {}
