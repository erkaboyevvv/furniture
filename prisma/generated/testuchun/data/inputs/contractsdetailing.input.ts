import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { IsNumber } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class ContractsDetailingInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  users_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  furniture_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  contracts_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  count: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  contract_date: string;
}

export class CreateContractsDetailingInput extends OmitType(
  ContractsDetailingInput,
  [] as const,
) {}

export class UpdateContractsDetailingInput extends PartialType(
  CreateContractsDetailingInput,
) {}
