import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class ColorsInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateColorsInput extends OmitType(ColorsInput, [] as const) {}

export class UpdateColorsInput extends PartialType(CreateColorsInput) {}
