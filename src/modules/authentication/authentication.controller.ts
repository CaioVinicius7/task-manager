import { Controller, Body, Post, HttpCode, HttpStatus } from "@nestjs/common";

import { SignInDTO } from "./dto/sign-in.dto";
import { SignInUseCase } from "./use-cases/sing-in";

@Controller()
export class AuthenticationController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() { username, password }: SignInDTO) {
    return await this.signInUseCase.execute({
      username,
      password
    });
  }
}
