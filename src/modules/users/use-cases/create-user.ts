import { PrismaService } from "src/infra/database/prisma.service";

import { Injectable } from "@nestjs/common";

interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ name, username, email, password }: CreateUserRequest) {
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

    if (user) {
      throw new Error("User already exists!");
    }

    const createdUser = await this.prisma.user.create({
      data: {
        name,
        username,
        email,
        password
      }
    });

    return {
      user: createdUser
    };
  }
}
