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
import { Prisma, FurnitureLikes } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FurnitureLikesCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.FurnitureLikesFindManyArgs,
  ): Promise<Result<PaginationModel<FurnitureLikes>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.furnitureLikes.findMany(filter),
        this.prismaService.furnitureLikes.count({ where: filter?.where }),
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
          `Could not get FurnitureLikes Resources.`,
        ),
      );
    }
  }

  async getById(id: number): Promise<Result<FurnitureLikes, Error>> {
    try {
      const result = await this.prismaService.furnitureLikes.findUniqueOrThrow({
        where: { id: id },
      });
      if (!result) {
        return err(
          new NotFoundException(`FurnitureLikes Resource ${id} was not found.`),
        );
      }
      return ok(result);
    } catch (e) {
      return err(
        new NotFoundException(`FurnitureLikes Resource ${id} was not found.`),
      );
    }
  }

  async like(
    data: Prisma.FurnitureLikesUncheckedCreateInput,
  ): Promise<Result<FurnitureLikes, Error>> {
    try {

      const user = await this.prismaService.users.findFirst({
        where: {id: data.users_id}
      });

      if(!user){
        return err(new NotFoundException('User not found'));
      }

      const furniture = await this.prismaService.furniture.findFirst({
        where: { id: data.furniture_id },
      });

      if (!furniture) {
        return err(new NotFoundException('Furniture not found'));
      }

      const res = await this.prismaService.furnitureLikes.findFirst({
        where: { furniture_id: data.furniture_id, users_id: data.users_id },
      });

      if(res){
        return err(new ConflictException('Already liked'));
      }

      console.log(data);
      

      const result = await this.prismaService.furnitureLikes.create({
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not create FurnitureLikes Resource.`,
        ),
      );
    }
  }

  async update(
    id: number,
    data: Prisma.FurnitureLikesUncheckedUpdateInput,
  ): Promise<Result<FurnitureLikes, Error>> {
    try {

      const res = await this.prismaService.furnitureLikes.findUnique({
        where: { id: id },
      });

      if(!res){
        return err(new NotFoundException('FurnitureLikes not found'));
      }

      if (data.users_id) {
        const user = await this.prismaService.users.findFirst({
          where: { id: Number(data.users_id) },
        });

        if (!user) {
          return err(new NotFoundException('User not found'));
        }
      }

      if(data.furniture_id){
        const furniture = await this.prismaService.furniture.findFirst({
          where: { id: Number(data.furniture_id) },
        });

        if (!furniture) {
          return err(new NotFoundException('Furniture not found'));
        }
      }

      const ress = await this.prismaService.furnitureLikes.findFirst({
        where: { furniture_id: Number(data.furniture_id), users_id: Number(data.users_id) },
      });

      if (ress) {
        return err(new ConflictException('Already liked'));
      }

      const result = await this.prismaService.furnitureLikes.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update FurnitureLikes Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: number): Promise<Result<FurnitureLikes, Error>> {
    try {
      const res = await this.prismaService.furnitureLikes.findFirst({
        where: { id: id },
      });
      if(!res){
        return err(new NotFoundException(`FurnitureLikes Resource ${id} was not found.`));
      }
      const result = await this.prismaService.furnitureLikes.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete FurnitureLikes Resource ${id}.`,
        ),
      );
    }
  }
}
