import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsString, IsDateString } from 'class-validator';
import { IsNumber } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class PaymentInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  users_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  contracts_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  user_card_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  company_card: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  payment_amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment_status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  payment_date: string;
}

export class CreatePaymentInput extends OmitType(PaymentInput, [] as const) {}

export class UpdatePaymentInput extends PartialType(CreatePaymentInput) {}
