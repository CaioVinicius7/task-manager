import { Module } from "@nestjs/common";

import { PrismaService } from "@infra/database/prisma.service";
import { Storage } from "@infra/providers/storage/storage";
import { SupabaseStorage } from "@infra/providers/storage/supabase/supabase-storage";

import { PrismaUserRepository } from "./repositories/prisma/user.prisma.repository";
import { UserRepository } from "./repositories/user.repository";
import { CreateUserUseCase } from "./use-cases/create-user";
import { GetUserProfileUseCase } from "./use-cases/get-user-profile";
import { UploadUserAvatarUseCase } from "./use-cases/upload-user-avatar";
import { UserController } from "./user.controller";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserProfileUseCase,
    UploadUserAvatarUseCase,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: Storage,
      useClass: SupabaseStorage
    }
  ],
  exports: [UserRepository]
})
export class UserModule {}
