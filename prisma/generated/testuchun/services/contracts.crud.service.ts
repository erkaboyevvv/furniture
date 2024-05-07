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
import { Prisma, Contracts } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContractsCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ContractsFindManyArgs,
  ): Promise<Result<PaginationModel<Contracts>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.contracts.findMany(filter),
        this.prismaService.contracts.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Contracts Resources.`));
    }
  }

  async getById(id: number): Promise<Result<Contracts, Error>> {
    try {
      const result = await this.prismaService.contracts.findUnique({
        where: { id: id }
      });

      if(!result){
        return err(new NotFoundException(`Contracts Resource ${id} was not found.`));
      }

      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Contracts Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.ContractsUncheckedCreateInput): Promise<Result<Contracts, Error>> {
    try {

      const user = await this.prismaService.users.findUnique({
        where: {id: data.users_id}
      });

      if(!user){
        return err(new NotFoundException('User not found'));
      }

      const supp = await this.prismaService.supplier.findUnique({
        where: { id: data.supplier_id },
      });

      if (!supp) {
        return err(new NotFoundException('Supplier not found'));
      }

      const result = await this.prismaService.contracts.create({ data: data });
      return ok(result);
    } catch (e) {
      console.log(e);
      
      return err(new InternalServerErrorException(`Could not create Contracts Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.ContractsUncheckedUpdateInput,
  ): Promise<Result<Contracts, Error>> {
    try {

      const contract = await this.prismaService.contracts.findUnique({
        where: { id: id },
      });

      if(!contract){
        return err(new NotFoundException('Contract not found'));
      }

      if(data.users_id){
        const user = await this.prismaService.users.findUnique({
          where: { id: Number(data.users_id) },
        });

        if (!user) {
          return err(new NotFoundException('User not found'));
        }
      }

      if(data.supplier_id){
        const supp = await this.prismaService.supplier.findUnique({
          where: { id: Number(data.supplier_id) },
        });

        if (!supp) {
          return err(new NotFoundException('Supplier not found'));
        }
      }

      const result = await this.prismaService.contracts.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Contracts Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<Contracts, Error>> {
    try {

      const contract = await this.prismaService.contracts.findUnique({
        where: { id: id },
      });

      if (!contract) {
        return err(new NotFoundException(`Contracts Resource ${id} was not found.`));
      }

      const result = await this.prismaService.contracts.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Contracts Resource ${id}.`,
      ));
    }
  }
}
