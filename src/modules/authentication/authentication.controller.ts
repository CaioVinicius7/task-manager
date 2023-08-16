import { zodToOpenAPI } from "nestjs-zod";

import { Controller, Body, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import { SignInSchema, SignInSchemaDTO } from "./schemas/sign-in";
import { SignInUseCase } from "./use-cases/sing-in";

const signInSchemaForSwagger = zodToOpenAPI(SignInSchema);
@Controller()
export class AuthenticationController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiTags("Authorization")
  @ApiBody({
    schema: signInSchemaForSwagger,
    description: "Endpoint to sign in"
  })
  @ApiResponse({
    status: 200,
    description: "Authenticated",
    schema: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpCJ9.eyJzdWIiOiI1MmQzhlOC0yNzM4LTQ2ZGYtODM2OS1hODA1OWFkNT.d5gjJ2MYy6Kjr7VEPXdzG_bRYKq1LVDp"
        }
      }
    }
  })
  async signIn(@Body() { username, password }: SignInSchemaDTO) {
    return await this.signInUseCase.execute({
      username,
      password
    });
  }
}
