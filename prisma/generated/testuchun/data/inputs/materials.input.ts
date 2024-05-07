import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class MaterialsInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateMaterialsInput extends OmitType(
  MaterialsInput,
  [] as const,
) {}

export class UpdateMaterialsInput extends PartialType(CreateMaterialsInput) {}
