import { hash } from "bcrypt";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../infra/database/prisma.service";
import { UserAlreadyExists } from "./errors/user-already-exists";

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
      throw new UserAlreadyExists();
    }

    const passwordHashed = await hash(password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        name,
        username,
        email,
        password: passwordHashed
      }
    });

    return {
      user: createdUser
    };
  }
}
