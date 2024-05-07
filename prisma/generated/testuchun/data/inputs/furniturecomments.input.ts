import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class FurnitureCommentsInput {
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
  @IsString()
  user_comment: string;
}

export class CreateFurnitureCommentsInput extends OmitType(
  FurnitureCommentsInput,
  [] as const,
) {}

export class UpdateFurnitureCommentsInput extends PartialType(
  CreateFurnitureCommentsInput,
) {}
