import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class RolesInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateRolesInput extends OmitType(RolesInput, [] as const) {}

export class UpdateRolesInput extends PartialType(CreateRolesInput) {}
