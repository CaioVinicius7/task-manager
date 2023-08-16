import { compare } from "bcrypt";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersRepository } from "@modules/users/repositories/users.repository";

import { InvalidCredentials } from "./errors/invalid-credentials";

interface SignInRequest {
  username: string;
  password: string;
}

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UsersRepository
  ) {}

  async execute({ username, password }: SignInRequest) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new InvalidCredentials();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentials();
    }

    const payload = {
      sub: user.id,
      username: user.username
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token
    };
  }
}
