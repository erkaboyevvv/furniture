import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class FurnitureLikesInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  users_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  furniture_id: number;
}

export class CreateFurnitureLikesInput extends OmitType(
  FurnitureLikesInput,
  [] as const,
) {}

export class UpdateFurnitureLikesInput extends PartialType(
  CreateFurnitureLikesInput,
) {}
