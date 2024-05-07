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
import { Prisma, UserAddress } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAddressCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.UserAddressFindManyArgs,
  ): Promise<Result<PaginationModel<UserAddress>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.userAddress.findMany(filter),
        this.prismaService.userAddress.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get UserAddress Resources.`));
    }
  }

  async getById(id: number): Promise<Result<UserAddress, Error>> {
    try {
      const result = await this.prismaService.userAddress.findUnique({
        where: { id: id }
      });
      if(!result) {
        return err(new NotFoundException(`UserAddress Resource ${id} was not found.`));
      }
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`UserAddress Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.UserAddressUncheckedCreateInput): Promise<Result<UserAddress, Error>> {
    try {
      const user = await this.prismaService.users.findFirst({
          where: { id: Number(data.users_id) }
        })

        if(!user){
          return err(new NotFoundException('User not found'));
        }
      const result = await this.prismaService.userAddress.create({ data: data });
      return ok(result);
    } catch (e) {
      console.log(e);
      
      return err(new InternalServerErrorException(`Could not create UserAddress Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.UserAddressUncheckedUpdateInput,
  ): Promise<Result<UserAddress, Error>> {
    try {

      const res = await this.prismaService.userAddress.findUnique({
        where: { id: id },
      });

      if (!res) {
        return err(new NotFoundException('Address not found'));
      }

      if(data.users_id){
        const user = await this.prismaService.users.findFirst({
          where: { id: Number(data.users_id) }
        })

        if(!user){
          return err(new NotFoundException('User not found'));
        }
      }

      const result = await this.prismaService.userAddress.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update UserAddress Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<UserAddress, Error>> {
    try {

      const res = await this.prismaService.userAddress.findUnique({
        where: { id: id },
      });

      if(!res){
        return err(new NotFoundException("Address not found"));
      }

      const result = await this.prismaService.userAddress.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete UserAddress Resource ${id}.`,
      ));
    }
  }
}
