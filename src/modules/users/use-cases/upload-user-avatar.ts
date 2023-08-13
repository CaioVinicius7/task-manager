import { extname } from "node:path";

import { Injectable } from "@nestjs/common";

import { Storage } from "@infra/providers/storage/storage";

import { UserRepository } from "../repositories/user.repository";

interface UploadUserAvatarRequest {
  userId: string;
  avatar: Express.Multer.File;
}

@Injectable()
export class UploadUserAvatarUseCase {
  constructor(
    private readonly storage: Storage,
    private readonly userRepository: UserRepository
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
