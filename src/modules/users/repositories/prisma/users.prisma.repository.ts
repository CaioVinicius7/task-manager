import { Injectable } from "@nestjs/common";

import { PrismaService } from "@infra/database/prisma.service";
import type { UsernameAndEmail } from "@modules/users/dto/find-by-username-or-email.dto";

import type { CreatedUser, CreateUser } from "../../dto/create-user.dto";
import { UsersRepository } from "../users.repository";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsernameOrEmail({
    username,
    email
  }: UsernameAndEmail): Promise<CreatedUser | null> {
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
  }: CreateUser): Promise<CreatedUser | null> {
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

  async updateAvatarUrl(id: string, avatarUrl: string): Promise<void> {
    await this.prisma.user.update({
      data: {
        avatarUrl
      },
      where: {
        id
      }
    });
  }
}
