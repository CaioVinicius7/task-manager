import { Request } from "express";

import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@infra/providers/auth-guard";

import { CreateUserResponseSchema, CreateUserDTO } from "./schemas/create-user";
import { CreateUserUseCase } from "./use-cases/create-user";
import { GetUserProfileUseCase } from "./use-cases/get-profile";

@Controller("/users")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase
  ) {}

  @Post()
  async create(@Body() { name, username, password, email }: CreateUserDTO) {
    const { user } = await this.createUserUseCase.execute({
      name,
      username,
      email,
      password
    });

    const formattedUser = CreateUserResponseSchema.parse(user);

    return {
      user: formattedUser
    };
  }

  @Get("/profile")
  @UseGuards(AuthGuard)
  async getProfile(@Req() request: Request) {
    return this.getUserProfileUseCase.execute(request.user.sub);
  }
}
