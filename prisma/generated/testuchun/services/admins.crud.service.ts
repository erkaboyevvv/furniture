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
import { Prisma, Admins } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminsCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.AdminsFindManyArgs,
  ): Promise<Result<PaginationModel<Admins>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.admins.findMany(filter),
        this.prismaService.admins.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Admins Resources.`));
    }
  }

  async getById(id: number): Promise<Result<Admins, Error>> {
    try {

      const result = await this.prismaService.admins.findUnique({
        where: { id: id }
      });

      if (!result) {
        return err(new NotFoundException('Admin not found'));
      }
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Admins Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.AdminsUncheckedCreateInput): Promise<Result<Admins, Error>> {
    try {
      const result = await this.prismaService.admins.create({ data: data });
      return ok(result);
    } catch (e) {
      console.log(e + "error nuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      
      // return err(new InternalServerErrorException(`Could not create Admins Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.AdminsUpdateInput,
  ): Promise<Result<Admins, Error>> {
    try {
      const admin = await this.prismaService.admins.findFirst({
        where: { id: id },
      });

      if (!admin) {
        return err(new NotFoundException('Admin not found'));
      }
      const result = await this.prismaService.admins.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Admins Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<Admins, Error>> {
    try {
      const admin = await this.prismaService.admins.findFirst({
        where: { id: id },
      });

      if (!admin) {
        return err(new NotFoundException('Admin not found'));
      }
      const result = await this.prismaService.admins.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Admins Resource ${id}.`,
      ));
    }
  }
}
