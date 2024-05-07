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
import { Prisma, UserCard } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserCardCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.UserCardFindManyArgs,
  ): Promise<Result<PaginationModel<UserCard>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.userCard.findMany(filter),
        this.prismaService.userCard.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get UserCard Resources.`));
    }
  }

  async getById(id: number): Promise<Result<UserCard, Error>> {
    try {
      const result = await this.prismaService.userCard.findUnique({
        where: { id: id }
      });
      if (!result) {
        return err(
          new NotFoundException(`UserCard Resource ${id} was not found.`),
        );
      }
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`UserCard Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.UserCardUncheckedCreateInput): Promise<Result<UserCard, Error>> {
    try {

      const findUser = await this.prismaService.users.findFirst({
        where: { id: data.users_id }
      })

      if (!findUser) {
        return err(new NotFoundException('User not found'));
      }

      const result = await this.prismaService.userCard.create({ data: data });
      return ok(result);
    } catch (e) {
      console.log(e);
      return err(new InternalServerErrorException(`Could not create UserCard Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.UserCardUncheckedUpdateInput,
  ): Promise<Result<UserCard, Error>> {
    try {

      const res = await this.prismaService.userCard.findUnique({
        where: { id: id },
      });
      if (!res) {
        return err(new NotFoundException(`Card Not found`));
      }

      if(data.users_id){
        const findUser = await this.prismaService.users.findFirst({
          where: { id: Number(data.users_id) }
        })

        if (!findUser) {
          return err(new NotFoundException('User not found'));
        }
      }

      const result = await this.prismaService.userCard.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update UserCard Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<UserCard, Error>> {
    try {

      const res = await this.prismaService.userCard.findUnique({
        where: { id: id },
      });
      if (!res) {
        return err(new NotFoundException(`Card Not found`));
      }

      const result = await this.prismaService.userCard.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete UserCard Resource ${id}.`,
      ));
    }
  }
}
