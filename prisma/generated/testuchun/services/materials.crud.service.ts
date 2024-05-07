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
import { Prisma, Materials } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialsCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.MaterialsFindManyArgs,
  ): Promise<Result<PaginationModel<Materials>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.materials.findMany(filter),
        this.prismaService.materials.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Materials Resources.`));
    }
  }

  async getById(id: number): Promise<Result<Materials, Error>> {
    try {
      const material = await this.prismaService.materials.findFirst({
        where: { id: id },
      });
      if (!material) {
        return err(new NotFoundException('Material not found.'));
      }
      const result = await this.prismaService.materials.findUnique({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Materials Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.MaterialsCreateInput): Promise<Result<Materials, Error>> {
    try {
      const createdMaterial = await this.prismaService.materials.findFirst({
        where: { name: String(data.name) },
      });
      if (createdMaterial) {
        return err(new ConflictException('This material name already exists.'));
      }
      const result = await this.prismaService.materials.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Materials Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.MaterialsUpdateInput,
  ): Promise<Result<Materials, Error>> {
    try {

      const material = await this.prismaService.materials.findFirst({
        where: { id: id },
      });
      if (!material) {
        return err(new NotFoundException('Material not found.'));
      }

      const updatedMaterial = await this.prismaService.materials.findFirst({
        where: { name: String(data.name) },
      });
      if (updatedMaterial) {
        return err(new ConflictException('This material name already exists.'));
      }


      const result = await this.prismaService.materials.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Materials Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<Materials, Error>> {
    try {
      const material = await this.prismaService.materials.findFirst({
        where: { id: id },
      });
      if (!material) {
        return err(new NotFoundException('Material not found.'));
      }
      const result = await this.prismaService.materials.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Materials Resource ${id}.`,
      ));
    }
  }
}
