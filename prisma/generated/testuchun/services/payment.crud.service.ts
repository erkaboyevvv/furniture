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
import { Prisma, Payment } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { err, ok, Result } from 'neverthrow';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.PaymentFindManyArgs,
  ): Promise<Result<PaginationModel<Payment>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.payment.findMany(filter),
        this.prismaService.payment.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Payment Resources.`));
    }
  }

  async getById(id: number): Promise<Result<Payment, Error>> {
    try {
      const result = await this.prismaService.payment.findUniqueOrThrow({
        where: { id: id }
      });

      if(!result){
        return err(new NotFoundException(`Payment Resource ${id} was not found.`));
      }

      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Payment Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.PaymentUncheckedCreateInput): Promise<Result<Payment, Error>> {
    try {

      const user = await this.prismaService.users.findUnique({
        where: {id: data.users_id}
      });

      if(!user){
        return err(new NotFoundException('User not found'));
      }

      const user_card = await this.prismaService.userCard.findUnique({
        where: { id: data.user_card_id },
      });

      if (!user_card) {
        return err(new NotFoundException('User Card not found'));
      }

      const contract = await this.prismaService.contracts.findUnique({
        where: { id: data.contracts_id },
      });

      if (!contract) {
        return err(new NotFoundException('Contract not found'));
      }

      const result = await this.prismaService.payment.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Payment Resource.`));
    }
  }

  async update(
    id: number,
    data: Prisma.PaymentUncheckedUpdateInput,
  ): Promise<Result<Payment, Error>> {
    try {

      const pay = await this.prismaService.payment.findUnique({
        where: { id: id },
      });

      if(!pay){
        return err(new NotFoundException(`Payment Resource ${id} was not found.`));
      }

      if(data.users_id){
        const user = await this.prismaService.users.findUnique({
          where: { id: Number(data.users_id) },
        });

        if (!user) {
          return err(new NotFoundException('User not found'));
        }
      }

      if(data.user_card_id){
        const user_card = await this.prismaService.userCard.findUnique({
          where: { id: Number(data.user_card_id) },
        });

        if (!user_card) {
          return err(new NotFoundException('User Card not found'));
        }
      }

      if(data.contracts_id){
        const contract = await this.prismaService.contracts.findUnique({
          where: { id: Number(data.contracts_id) },
        });

        if (!contract) {
          return err(new NotFoundException('Contract not found'));
        }
      }

      const result = await this.prismaService.payment.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Payment Resource ${id}.`,
      ));
    }
  }

  async delete(id: number): Promise<Result<Payment, Error>> {
    try {

      const res = await this.prismaService.payment.findUnique({
        where: { id: id },
      });

      if(!res){
        return err(new NotFoundException(`Payment Resource ${id} was not found.`));
      }

      const result = await this.prismaService.payment.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Payment Resource ${id}.`,
      ));
    }
  }
}
