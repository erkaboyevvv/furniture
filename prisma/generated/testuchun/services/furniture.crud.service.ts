/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Furniture } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FurnitureCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.FurnitureFindManyArgs,
  ): Promise<Result<PaginationModel<Furniture>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.furniture.findMany(filter),
        this.prismaService.furniture.count({ where: filter?.where }),
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
    } catch (e) {
      return err(
        new InternalServerErrorException(`Could not get Furniture Resources.`),
      );
    }
  }

  async getById(id: number): Promise<Result<Furniture, Error>> {
    try {
      const result = await this.prismaService.furniture.findUniqueOrThrow({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new NotFoundException(`Furniture Resource ${id} was not found.`),
      );
    }
  }

  async create(
    data: Prisma.FurnitureUncheckedCreateInput,
  ): Promise<Result<Furniture, Error>> {
    try {
      const materials = await this.prismaService.materials.findFirst({
        where: { id: data.materials_id },
      });
      if (!materials) {
        return err(new NotFoundException('Material not found'));
      }
      const colors = await this.prismaService.colors.findFirst({
        where: { id: data.colors_id },
      });
      if (!colors) {
        return err(new NotFoundException('Colors not found'));
      }

      const roomTypes = await this.prismaService.roomTypes.findFirst({
        where: { id: data.roomTypes_id },
      });
      if (!roomTypes) {
        return err(new NotFoundException('Room type not found'));
      }

      const furniture_types = await this.prismaService.furnitureTypes.findFirst(
        {
          where: { id: data.furniture_types_id },
        },
      );
      if (!furniture_types) {
        return err(new NotFoundException('Furniture Type not found'));
      }

      const result = await this.prismaService.furniture.create({ data: data });
      return ok(result);
    } catch (e) {
      console.log(e);
      return err(
        new InternalServerErrorException(
          `Could not create Furniture Resource.`,
        ),
      );
    }
  }

  async update(
    id: number,
    data: Prisma.FurnitureUncheckedCreateInput,
  ): Promise<Result<Furniture, Error>> {
    try {
      const find_furniture = await this.prismaService.furniture.findFirst({
        where: { id: id },
      });

      if (!find_furniture) {
        return err(new NotFoundException('Furniture not found.'));
      }

      if (data.materials_id) {
        const materials = await this.prismaService.materials.findFirst({
          where: { id: data.materials_id },
        });
        if (!materials) {
          return err(new NotFoundException('Material not found'));
        }
      }

      if (data.colors_id) {
        const colors = await this.prismaService.colors.findFirst({
          where: { id: data.colors_id },
        });
        if (!colors) {
          return err(new NotFoundException('Colors not found'));
        }
      }

      if (data.roomTypes_id) {
        const roomTypes = await this.prismaService.roomTypes.findFirst({
          where: { id: data.roomTypes_id },
        });
        if (!roomTypes) {
          return err(new NotFoundException('Room type not found'));
        }
      }

      if (data.furniture_types_id) {
        const furniture_types =
          await this.prismaService.furnitureTypes.findFirst({
            where: { id: data.furniture_types_id },
          });
        if (!furniture_types) {
          return err(new NotFoundException('Furniture Type not found'));
        }
      }

      const result = await this.prismaService.furniture.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update Furniture Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: number): Promise<Result<Furniture, Error>> {
    try {
      const find_furniture = await this.prismaService.furniture.findFirst({
        where: { id: id },
      });

      if (!find_furniture) {
        return err(new NotFoundException('Furniture not found.'));
      }

      const result = await this.prismaService.furniture.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete Furniture Resource ${id}.`,
        ),
      );
    }
  }
}
