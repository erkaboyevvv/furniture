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
import { Prisma, Supplier } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupplierCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.SupplierFindManyArgs,
  ): Promise<Result<PaginationModel<Supplier>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.supplier.findMany(filter),
        this.prismaService.supplier.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Supplier Resources.`));
    }
  }

  async getById(id: number): Promise<Result<Supplier, Error>> {
    try {
      const result = await this.prismaService.supplier.findUnique({
        where: { id: id }
      });

      if(!result){
        return err(new NotFoundException(`Supplier Resource ${id} was not found.`));
      }

      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Supplier Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.SupplierUncheckedCreateInput): Promise<Result<Supplier, Error>> {
    try {
      const supp = await this.prismaService.supplier.findUnique({
        where: { email: data.email }
      });

      if(supp){
        return err(new ConflictException('This email already exists.'));
      }

      const result = await this.prismaService.supplier.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Supplier Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.SupplierUpdateInput,
  ): Promise<Result<Supplier, Error>> {
    try {

      const res = await this.prismaService.supplier.findUnique({
        where: { id: id },
      })

      if(!res){
        return err(
          new NotFoundException(`Supplier Resource ${id} was not found.`),
        );
      }

      const result = await this.prismaService.supplier.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Supplier Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<Supplier, Error>> {
    try {
      
      const res = await this.prismaService.supplier.findUnique({
        where: { id: id },
      });

      if (!res) {
        return err(
          new NotFoundException(`Supplier Resource ${id} was not found.`),
        );
      }

      const result = await this.prismaService.supplier.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Supplier Resource ${id}.`,
      ));
    }
  }
}
