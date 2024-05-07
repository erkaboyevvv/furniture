import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class RoomTypesInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateRoomTypesInput extends OmitType(
  RoomTypesInput,
  [] as const,
) {}

export class UpdateRoomTypesInput extends PartialType(CreateRoomTypesInput) {}
