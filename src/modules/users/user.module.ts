import { Module } from "@nestjs/common";

import { PrismaService } from "@infra/database/prisma.service";

import { PrismaUserRepository } from "./repositories/prisma/user.prisma.repository";
import { UserRepository } from "./repositories/user.repository";
import { CreateUserUseCase } from "./use-cases/create-user";
import { GetUserProfileUseCase } from "./use-cases/get-profile";
import { UserController } from "./user.controller";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserProfileUseCase,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [UserRepository]
})
export class UserModule {}
