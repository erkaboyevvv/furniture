/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, RoomTypes } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomTypesCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.RoomTypesFindManyArgs,
  ): Promise<Result<PaginationModel<RoomTypes>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.roomTypes.findMany(filter),
        this.prismaService.roomTypes.count({ where: filter?.where }),
      ]);

      const take = filter?.take ? filter?.take : count;
      const skip = filter?.skip ? filter?.skip : 0;

      return ok({
        items: items,
        meta: {
          totalItems: count,
          items: items.length,
          totalPages: Math.ceil(count / take),
          page: skip / take + 1,
        },
      });
    }
    catch(e) {
      return err(new InternalServerErrorException(`Could not get RoomTypes Resources.`));
    }
  }

  async getById(id: number): Promise<Result<RoomTypes, Error>> {
    try {
      
      const room_type = await this.prismaService.roomTypes.findFirst({
        where: { id: id },
      });
      if (!room_type) {
        return err(new NotFoundException('Room type not found.'));
      }

      const result = await this.prismaService.roomTypes.findUnique({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`RoomTypes Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.RoomTypesCreateInput): Promise<Result<RoomTypes, Error>> {
    try {

      const createdRoomType = await this.prismaService.roomTypes.findFirst({
        where: { name: String(data.name) },
      });
      if (createdRoomType) {
        return err(
          new ConflictException('This room type name already exists.'),
        );
      }

      const result = await this.prismaService.roomTypes.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create RoomTypes Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.RoomTypesUpdateInput,
  ): Promise<Result<RoomTypes, Error>> {
    try {

      const room_type = await this.prismaService.roomTypes.findFirst({
        where: { id: id },
      });
      if (!room_type) {
        return err(new NotFoundException('Room type not found.'));
      }

      const updatedRoomType = await this.prismaService.roomTypes.findFirst({
        where: { name: String(data.name) },
      });
      if (updatedRoomType) {
        return err(
          new ConflictException('This room type name already exists.'),
        );
      }

      const result = await this.prismaService.roomTypes.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update RoomTypes Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<RoomTypes, Error>> {
    try {

      const room_type = await this.prismaService.roomTypes.findFirst({
        where: { id: id },
      });
      if (!room_type) {
        return err(new NotFoundException('Room type not found.'));
      }

      const result = await this.prismaService.roomTypes.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete RoomTypes Resource ${id}.`,
      ));
    }
  }
}
