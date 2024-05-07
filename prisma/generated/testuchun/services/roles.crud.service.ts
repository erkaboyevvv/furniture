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
import { Prisma, Roles } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.RolesFindManyArgs,
  ): Promise<Result<PaginationModel<Roles>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.roles.findMany(filter),
        this.prismaService.roles.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Roles Resources.`));
    }
  }

  async getById(id: number): Promise<Result<Roles, Error>> {
    try {
      const result = await this.prismaService.roles.findUniqueOrThrow({
        where: { id: id }
      });

      if(!result){
        return err(new NotFoundException(`Roles Resource ${id} was not found.`));
      }

      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Roles Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.RolesCreateInput): Promise<Result<Roles, Error>> {
    try {

      const val = await this.prismaService.roles.findFirst({
        where: { value: data.value }
      });

      if(val){
        return err(new ConflictException(`Roles Resource ${data.value} already exists.`));
      }

      const result = await this.prismaService.roles.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Roles Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.RolesUncheckedUpdateInput,
  ): Promise<Result<Roles, Error>> {
    try {

      const res = await this.prismaService.roles.findUnique({
        where: { id: id },
      });

      if(!res){
        return err(new NotFoundException('Roles not found'));
      }

       if(data.value){
        const val = await this.prismaService.roles.findFirst({
          where: { value: String(data.value) },
        });

        if (val) {
          return err(
            new ConflictException(
              `Roles Resource ${data.value} already exists.`,
            ),
          );
        }
       }

      const result = await this.prismaService.roles.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Roles Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<Roles, Error>> {
    try {
      const res = await this.prismaService.roles.findUnique({
        where: { id: id },
      });

      if (!res) {
        return err(new NotFoundException('Roles not found'));
      }

      const result = await this.prismaService.roles.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Roles Resource ${id}.`,
      ));
    }
  }
}
