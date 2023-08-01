import { hash } from "bcrypt";

import { Injectable } from "@nestjs/common";

import { UserRepository } from "../repositories/user.repository";
import { UserAlreadyExists } from "./errors/user-already-exists";

interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, username, email, password }: CreateUserRequest) {
    const user = await this.userRepository.findByUsernameOrEmail({
      username,
      email
    });

    if (user) {
      throw new UserAlreadyExists();
    }

    const passwordHashed = await hash(password, 10);

    const createdUser = await this.userRepository.save({
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
