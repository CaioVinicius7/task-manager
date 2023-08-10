import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes
} from "@nestjs/common";

import { AuthGuard } from "@infra/providers/auth-guard";

import { CreateUserDTO } from "./dto/create-user.dto";
import { CreateUserValidationPipe } from "./pipes/create-user.validation.pipe";
import { CreateUserUseCase } from "./use-cases/create-user";

@Controller("/users")
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() { name, username, password, email }: CreateUserDTO) {
    return await this.createUserUseCase.execute({
      name,
      username,
      email,
      password
    });
  }

  @Get("/profile")
  @UseGuards(AuthGuard)
  async profile() {
    return {
      message: "Ok"
    };
  }
}
