import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "../users/users.module";
import { AuthenticationController } from "./authentication.controller";
import { SignInUseCase } from "./use-cases/sing-in";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "1h"
      }
    }),
    UserModule
  ],
  controllers: [AuthenticationController],
  providers: [SignInUseCase]
})
export class AuthenticationModule {}
