import { hash } from "bcrypt";

import { Injectable } from "@nestjs/common";

import { UsersRepository } from "../repositories/users.repository";
import { UserAlreadyExists } from "./errors/user-already-exists";

interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ name, username, email, password }: CreateUserRequest) {
    const user = await this.usersRepository.findByUsernameOrEmail({
      username,
      email
    });

    if (user) {
      throw new UserAlreadyExists();
    }

    const passwordHashed = await hash(password, 10);

    const createdUser = await this.usersRepository.save({
      name,
      username,
      email,
      password: passwordHashed
    });

    return {
      user: createdUser
    };
  }
}
