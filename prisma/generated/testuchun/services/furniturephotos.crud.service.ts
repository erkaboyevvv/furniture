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
import { Prisma, FurniturePhotos } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FurniturePhotosCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.FurniturePhotosFindManyArgs,
  ): Promise<Result<PaginationModel<FurniturePhotos>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.furniturePhotos.findMany(filter),
        this.prismaService.furniturePhotos.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get FurniturePhotos Resources.`));
    }
  }

  async getById(id: number): Promise<Result<FurniturePhotos, Error>> {
    try {

      const furniture_photos = await this.prismaService.furniturePhotos.findFirst({
        where: { id: id },
      });
      if (!furniture_photos) {
        return err(new NotFoundException('Furniture photos not found.'));
      }

      const result = await this.prismaService.furniturePhotos.findUnique({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`FurniturePhotos Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.FurniturePhotosUncheckedCreateInput): Promise<Result<FurniturePhotos, Error>> {
    try {

      const furniture = await this.prismaService.furniture.findFirst({
        where: { id: Number(data.furniture_id) },
      });
      if (!furniture) {
        return err(new NotFoundException('Furniture not found.'));
      }

      const result = await this.prismaService.furniturePhotos.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create FurniturePhotos Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.FurniturePhotosUncheckedUpdateInput,
  ): Promise<Result<FurniturePhotos, Error>> {
    try {

      const furniture_photos =
        await this.prismaService.furniturePhotos.findFirst({
          where: { id: id },
        });
      if (!furniture_photos) {
        return err(new NotFoundException('Furniture photos not found.'));
      }

      if(data.furniture_id){
        const furniture = await this.prismaService.furniture.findFirst({
          where: { id: Number(data.furniture_id) },
        });
        if (!furniture) {
          return err(new NotFoundException('Furniture not found.'));
        }
      }

      const result = await this.prismaService.furniturePhotos.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update FurniturePhotos Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<FurniturePhotos, Error>> {
    try {

      const furniture_photos =
        await this.prismaService.furniturePhotos.findFirst({
          where: { id: id },
        });
      if (!furniture_photos) {
        return err(new NotFoundException('Furniture photos not found.'));
      }

      const result = await this.prismaService.furniturePhotos.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete FurniturePhotos Resource ${id}.`,
      ));
    }
  }
}
