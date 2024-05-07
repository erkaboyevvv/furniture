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
import { Prisma, FurnitureComments } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FurnitureCommentsCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.FurnitureCommentsFindManyArgs,
  ): Promise<Result<PaginationModel<FurnitureComments>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.furnitureComments.findMany(filter),
        this.prismaService.furnitureComments.count({ where: filter?.where }),
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
        new InternalServerErrorException(
          `Could not get FurnitureComments Resources.`,
        ),
      );
    }
  }

  async getById(id: number): Promise<Result<FurnitureComments, Error>> {
    try {
      const result =
        await this.prismaService.furnitureComments.findUniqueOrThrow({
          where: { id: id },
        });
      if (!result) {
        return err(
          new NotFoundException(
            `FurnitureComments Resource ${id} was not found.`,
          ),
        );
      }
      return ok(result);
    } catch (e) {
      return err(
        new NotFoundException(
          `FurnitureComments Resource ${id} was not found.`,
        ),
      );
    }
  }

  async create(
    data: Prisma.FurnitureCommentsUncheckedCreateInput,
  ): Promise<Result<FurnitureComments, Error>> {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { id: data.users_id },
      });

      if (!user) {
        return err(new NotFoundException('User not found'));
      }

      const furniture = await this.prismaService.furniture.findFirst({
        where: { id: data.furniture_id },
      });

      if (!furniture) {
        return err(new NotFoundException('Furniture not found'));
      }

      const result = await this.prismaService.furnitureComments.create({
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not create FurnitureComments Resource.`,
        ),
      );
    }
  }

  async update(
    id: number,
    data: Prisma.FurnitureCommentsUncheckedUpdateInput,
  ): Promise<Result<FurnitureComments, Error>> {
    try {

      const res = await this.prismaService.furnitureComments.findUnique({
        where: { id: id },
      });

      if(!res){
        return err(new NotFoundException(`FurnitureComments Resource ${id} was not found.`));
      }

      if (data.users_id) {
        const user = await this.prismaService.users.findFirst({
          where: { id: Number(data.users_id) },
        });

        if (!user) {
          return err(new NotFoundException('User not found'));
        }
      }

      if (data.furniture_id) {
        const furniture = await this.prismaService.furniture.findFirst({
          where: { id: Number(data.furniture_id) },
        });

        if (!furniture) {
          return err(new NotFoundException('Furniture not found'));
        }
      }
      const result = await this.prismaService.furnitureComments.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update FurnitureComments Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: number): Promise<Result<FurnitureComments, Error>> {
    try {
      const res = await this.prismaService.furnitureComments.findUnique({
        where: { id: id },
      });
      if(!res){
        return err(new NotFoundException(`FurnitureComments Resource ${id} was not found.`));
      }
      const result = await this.prismaService.furnitureComments.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete FurnitureComments Resource ${id}.`,
        ),
      );
    }
  }
}
