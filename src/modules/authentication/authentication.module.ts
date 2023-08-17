import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { PrismaUsersRepository } from "@modules/users/repositories/prisma/users.prisma.repository";
import { UsersRepository } from "@modules/users/repositories/users.repository";

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
    })
  ],
  controllers: [AuthenticationController],
  providers: [
    SignInUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    }
  ]
})
export class AuthenticationModule {}
