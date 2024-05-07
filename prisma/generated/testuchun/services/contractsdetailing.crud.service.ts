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
import { Prisma, ContractsDetailing } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContractsDetailingCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ContractsDetailingFindManyArgs,
  ): Promise<Result<PaginationModel<ContractsDetailing>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.contractsDetailing.findMany(filter),
        this.prismaService.contractsDetailing.count({ where: filter?.where }),
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
          `Could not get ContractsDetailing Resources.`,
        ),
      );
    }
  }

  async getById(id: number): Promise<Result<ContractsDetailing, Error>> {
    try {
      const result =
        await this.prismaService.contractsDetailing.findUniqueOrThrow({
          where: { id: id },
        });
      if (!result) {
        return err(
          new NotFoundException(
            `ContractsDetailing Resource ${id} was not found.`,
          ),
        );
      }
      return ok(result);
    } catch (e) {
      return err(
        new NotFoundException(
          `ContractsDetailing Resource ${id} was not found.`,
        ),
      );
    }
  }

  async create(
    data: Prisma.ContractsDetailingUncheckedCreateInput,
  ): Promise<Result<ContractsDetailing, Error>> {
    try {
      const resUser = await this.prismaService.users.findUnique({
        where: { id: Number(data.users_id) },
      });

      if (!resUser) {
        return err(new NotFoundException('User not found'));
      }

      const resCon = await this.prismaService.contracts.findUnique({
        where: { id: Number(data.contracts_id) },
      });

      if (!resCon) {
        return err(new NotFoundException('Contract not found'));
      }

      const res = await this.prismaService.furniture.findUnique({
        where: { id: Number(data.furniture_id) },
      });

      if (!res) {
        return err(new NotFoundException('Furniture not found'));
      }

      const result = await this.prismaService.contractsDetailing.create({
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not create ContractsDetailing Resource.`,
        ),
      );
    }
  }

  async update(
    id: number,
    data: Prisma.ContractsDetailingUncheckedUpdateInput,
  ): Promise<Result<ContractsDetailing, Error>> {
    try {
      const res = await this.prismaService.contractsDetailing.findUnique({
        where: { id: id },
      });

      if (!res) {
        return err(new NotFoundException('ContractsDetailing not found'));
      }

      if (data.users_id) {
        const resUser = await this.prismaService.users.findUnique({
          where: { id: Number(data.users_id) },
        });

        if (!resUser) {
          return err(new NotFoundException('User not found'));
        }
      }

      if (data.contracts_id) {
        const res = await this.prismaService.contracts.findUnique({
          where: { id: Number(data.contracts_id) },
        });

        if (!res) {
          return err(new NotFoundException('Contract not found'));
        }
      }

      if (data.furniture_id) {
        const res = await this.prismaService.furniture.findUnique({
          where: { id: Number(data.furniture_id) },
        });

        if (!res) {
          return err(new NotFoundException('Furniture not found'));
        }
      }

      const result = await this.prismaService.contractsDetailing.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not update ContractsDetailing Resource ${id}.`,
        ),
      );
    }
  }

  async delete(id: number): Promise<Result<ContractsDetailing, Error>> {
    try {
      const res = await this.prismaService.contractsDetailing.findUnique({
        where: { id: id },
      });

      if (!res) {
        return err(new NotFoundException('ContractsDetailing not found'));
      }

      const result = await this.prismaService.contractsDetailing.delete({
        where: { id: id },
      });
      return ok(result);
    } catch (e) {
      return err(
        new InternalServerErrorException(
          `Could not delete ContractsDetailing Resource ${id}.`,
        ),
      );
    }
  }
}
