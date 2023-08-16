import { extname } from "node:path";

import { Injectable } from "@nestjs/common";

import { Storage } from "@infra/providers/storage/storage";

import { UsersRepository } from "../repositories/users.repository";

interface UploadUserAvatarRequest {
  userId: string;
  avatar: Express.Multer.File;
}

@Injectable()
export class UploadUserAvatarUseCase {
  constructor(
    private readonly storage: Storage,
    private readonly userRepository: UsersRepository
  ) {}

  async execute({ userId, avatar }: UploadUserAvatarRequest) {
    const avatarExtension = extname(avatar.originalname);

    const editedAvatarName = `${userId}${avatarExtension}`;

    avatar.originalname = editedAvatarName;

    const { path } = await this.storage.upload(avatar, "/avatar");

    await this.userRepository.updateAvatarUrl(userId, path);

    return {
      path
    };
  }
}
