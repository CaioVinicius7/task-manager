import { Injectable } from "@nestjs/common";

import { PrismaService } from "@infra/database/prisma.service";

import type {
  UsernameAndEmail,
  CreatedUser,
  CreateUserDTO
} from "../../dto/create-user.dto";
import { UserRepository } from "../user.repository";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsernameOrEmail({
    username,
    email
  }: UsernameAndEmail): Promise<CreatedUser> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username
          },
          {
            email
          }
        ]
      }
    });

    return user;
  }
  async save({
    name,
    username,
    email,
    password
  }: CreateUserDTO): Promise<CreatedUser> {
    const createdUser = await this.prisma.user.create({
      data: {
        name,
        username,
        email,
        password
      }
    });

    return createdUser;
  }

  async findById(id: string): Promise<CreatedUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    return user;
  }

  async findByUsername(username: string): Promise<CreatedUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      }
    });

    return user;
  }
}
