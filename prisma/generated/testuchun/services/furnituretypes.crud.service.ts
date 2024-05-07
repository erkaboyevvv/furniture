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
import { Prisma, FurnitureTypes } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FurnitureTypesCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.FurnitureTypesFindManyArgs,
  ): Promise<Result<PaginationModel<FurnitureTypes>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.furnitureTypes.findMany(filter),
        this.prismaService.furnitureTypes.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get FurnitureTypes Resources.`));
    }
  }

  async getById(id: number): Promise<Result<FurnitureTypes, Error>> {
    try {

      const furniture_type = await this.prismaService.furnitureTypes.findFirst({
        where: { id: id },
      });
      if (!furniture_type) {
        return err(new NotFoundException('Furniture type not found.'));
      }

      const result = await this.prismaService.furnitureTypes.findUnique({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`FurnitureTypes Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.FurnitureTypesCreateInput): Promise<Result<FurnitureTypes, Error>> {
    try {

      const createdFurnitureType =
        await this.prismaService.furnitureTypes.findFirst({
          where: { name: String(data.name) },
        });
      if (createdFurnitureType) {
        return err(
          new ConflictException('This furniture type name already exists.'),
        );
      }

      const result = await this.prismaService.furnitureTypes.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create FurnitureTypes Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.FurnitureTypesUpdateInput,
  ): Promise<Result<FurnitureTypes, Error>> {
    try {

      const furniture_type = await this.prismaService.furnitureTypes.findFirst({
        where: { id: id },
      });
      if (!furniture_type) {
        return err(new NotFoundException('Furniture type not found.'));
      }

      const updatedFurnitureType =
        await this.prismaService.furnitureTypes.findFirst({
          where: { name: String(data.name) },
        });
      if (updatedFurnitureType) {
        return err(
          new ConflictException('This furniture type name already exists.'),
        );
      }

      const result = await this.prismaService.furnitureTypes.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update FurnitureTypes Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<FurnitureTypes, Error>> {
    try {

      const furniture_type = await this.prismaService.furnitureTypes.findFirst({
        where: { id: id },
      });
      if (!furniture_type) {
        return err(new NotFoundException('Furniture type not found.'));
      }

      const result = await this.prismaService.furnitureTypes.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete FurnitureTypes Resource ${id}.`,
      ));
    }
  }
}
