import { Controller, Body, Post, HttpCode, HttpStatus } from "@nestjs/common";

import { SignInSchemaDTO } from "./schemas/sign-in";
import { SignInUseCase } from "./use-cases/sing-in";

@Controller()
export class AuthenticationController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() { username, password }: SignInSchemaDTO) {
    return await this.signInUseCase.execute({
      username,
      password
    });
  }
}
