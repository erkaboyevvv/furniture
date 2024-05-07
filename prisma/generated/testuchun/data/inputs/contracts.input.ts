import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsString } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class ContractsInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  users_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  supplier_id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  delivery_date: string;

  @ApiProperty({required: false})
  @Optional()
  @IsString()
  note_to_supplier?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hours: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  delivery_status: string;
}

export class CreateContractsInput extends OmitType(
  ContractsInput,
  [] as const,
) {}

export class UpdateContractsInput extends PartialType(CreateContractsInput) {}
