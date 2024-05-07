/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Colors } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorsCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ColorsFindManyArgs,
  ): Promise<Result<PaginationModel<Colors>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.colors.findMany(filter),
        this.prismaService.colors.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Colors Resources.`));
    }
  }

  async getById(id: number): Promise<Result<Colors, Error>> {
    try {
      const result = await this.prismaService.colors.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Colors Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.ColorsCreateInput): Promise<Result<Colors, Error>> {
    try {
      const col = await this.prismaService.colors.findUnique({
        where: { name: data.name }
      })
      if(col){
        return err(new ConflictException('This color name already exists.')); 
      }
      const result = await this.prismaService.colors.create({ data: data });
      return ok(result);
    } catch (e) {
      console.log(e);
      return err(new InternalServerErrorException(`Could not create Colors Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.ColorsUpdateInput,
  ): Promise<Result<Colors, Error>> {
    try {
      const col = await this.prismaService.colors.findFirst({
        where: {id : id}
      });
      if(!col){
        return err(new NotFoundException('Color not found.'));
      }
      const updatedColor = await this.prismaService.colors.findFirst({
        where: { name: String(data.name) },
      });
      if (updatedColor) {
        return err(new ConflictException('This color name already exists.'));
      }
      const result = await this.prismaService.colors.update({
        where: { id: id },
        data: data
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Colors Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<Colors, Error>> {
    try {
      const col = await this.prismaService.colors.findFirst({
        where: { id: id },
      });
      if (!col) {
        return err(new NotFoundException('Color not found.'));
      }
      const result = await this.prismaService.colors.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Colors Resource ${id}.`,
      ));
    }
  }
}
