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
import { Prisma, Users } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.UsersFindManyArgs,
  ): Promise<Result<PaginationModel<Users>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.users.findMany(filter),
        this.prismaService.users.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Users Resources.`));
    }
  }

  async getById(id: number): Promise<Result<Users, Error>> {
    try {
      
      const user = await this.prismaService.users.findFirst({
        where: { id: id },
      });

      if (!user) {
        return err(new NotFoundException('User not found'));
      }

      const result = await this.prismaService.users.findUnique({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Users Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.UsersCreateInput): Promise<Result<Users, Error>> {
    try {

      const email_user = await this.prismaService.users.findUnique({
        where: { email: data.email }
      })

      if(email_user){
        return err(new ConflictException('This email already exists.')); 
      }

      const result = await this.prismaService.users.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Users Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.UsersUpdateInput,
  ): Promise<Result<Users, Error>> {
    try {
      
      const user = await this.prismaService.users.findFirst({
        where: { id: id },
      });

      if (!user) {
        return err(new NotFoundException('User not found'));
      }

      const result = await this.prismaService.users.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      console.log(e);
      return err(new InternalServerErrorException(
        `Could not update Users Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<Users, Error>> {
    try {

      const deletedUser = await this.prismaService.users.findFirst({
        where: {id: id}
      });

      if(!deletedUser){
        return err(new NotFoundException("User not found"));
      }

      const result = await this.prismaService.users.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Users Resource ${id}.`,
      ));
    }
  }
}
