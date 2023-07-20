import { Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserUseCase } from "./use-cases/create-user";

@Controller("/users")
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() { name, username, password, email }: CreateUserDto) {
    return await this.createUserUseCase.execute({
      name,
      username,
      email,
      password
    });
  }
}
