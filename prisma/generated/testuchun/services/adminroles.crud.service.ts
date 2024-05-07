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
import { Prisma, AdminRoles } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminRolesCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.AdminRolesFindManyArgs,
  ): Promise<Result<PaginationModel<AdminRoles>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.adminRoles.findMany(filter),
        this.prismaService.adminRoles.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get AdminRoles Resources.`));
    }
  }

  async getById(id: number): Promise<Result<AdminRoles, Error>> {
    try {
      const result = await this.prismaService.adminRoles.findUniqueOrThrow({
        where: { id: id }
      });
      if(!result){
        return err(new NotFoundException(`AdminRoles Resource ${id} was not found.`));
      }
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`AdminRoles Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.AdminRolesUncheckedCreateInput): Promise<Result<AdminRoles, Error>> {
    try {

      const admin = await this.prismaService.admins.findUnique({
        where: { id: data.admins_id },
      });

      if (!admin) {
        return err(new NotFoundException('Admin not found'));
      }

      const role = await this.prismaService.roles.findUnique({
        where: { id: data.roles_id },
      });

      if (!role) {
        return err(new NotFoundException('Role not found'));
      }

      const res = await this.prismaService.adminRoles.findFirst({
        where: {admins_id: data.admins_id , roles_id: data.roles_id}
      });
      if(res){
        return err(new ConflictException(`AdminRoles Resource already exists.`));
      }

      const result = await this.prismaService.adminRoles.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create AdminRoles Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.AdminRolesUncheckedUpdateInput,
  ): Promise<Result<AdminRoles, Error>> {
    try {

     if (data.admins_id) {
       const admin = await this.prismaService.admins.findUnique({
         where: { id: Number(data.admins_id) },
       });

       if (!admin) {
         return err(new NotFoundException('Admin not found'));
       }
     }

      if (data.roles_id) {
        const role = await this.prismaService.roles.findUnique({
          where: { id: Number(data.roles_id) },
        });

        if (!role) {
          return err(new NotFoundException('Role not found'));
        }
      }

      const res = await this.prismaService.adminRoles.findFirst({
        where: { admins_id: Number(data.admins_id), roles_id: Number(data.roles_id) },
      });
      if (res) {
        return err(
          new ConflictException(
            `AdminRoles Resource already exists.`,
          ),
        );
      }

      const result = await this.prismaService.adminRoles.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update AdminRoles Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<AdminRoles, Error>> {
    try {

      const res = await this.prismaService.adminRoles.findUnique({
        where: { id: id },
      });

      if(!res){
        return err(new NotFoundException("Admin Role not found"));
      }

      const result = await this.prismaService.adminRoles.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete AdminRoles Resource ${id}.`,
      ));
    }
  }
}
