import { Module } from "@nestjs/common";

import { Storage } from "@infra/providers/storage/storage";
import { SupabaseStorage } from "@infra/providers/storage/supabase/supabase-storage";

import { PrismaUsersRepository } from "./repositories/prisma/users.prisma.repository";
import { UsersRepository } from "./repositories/users.repository";
import { CreateUserUseCase } from "./use-cases/create-user";
import { GetUserProfileUseCase } from "./use-cases/get-user-profile";
import { UploadUserAvatarUseCase } from "./use-cases/upload-user-avatar";
import { UserController } from "./users.controller";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserProfileUseCase,
    UploadUserAvatarUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
    {
      provide: Storage,
      useClass: SupabaseStorage
    }
  ],
  exports: [UsersRepository]
})
export class UsersModule {}
