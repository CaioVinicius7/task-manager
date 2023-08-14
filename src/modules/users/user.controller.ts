import { Request } from "express";

import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { AuthGuard } from "@infra/providers/auth-guard";

import { CreateUserResponseSchema, CreateUserDTO } from "./schemas/create-user";
import { CreateUserUseCase } from "./use-cases/create-user";
import { GetUserProfileUseCase } from "./use-cases/get-profile";
import { UploadUserAvatarUseCase } from "./use-cases/upload-user-avatar";

@Controller("/users")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly uploadUserAvatarUseCase: UploadUserAvatarUseCase
  ) {}

  @Post()
  async create(@Body() { name, username, password, email }: CreateUserDTO) {
    const { user } = await this.createUserUseCase.execute({
      name,
      username,
      email,
      password
    });

    const formattedUser = CreateUserResponseSchema.parse(user);

    return {
      user: formattedUser
    };
  }

  @Get("/profile")
  @UseGuards(AuthGuard)
  async getProfile(@Req() request: Request) {
    const { user } = await this.getUserProfileUseCase.execute(request.user.sub);

    return {
      user
    };
  }

  @Patch("/avatar")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.uploadUserAvatarUseCase.execute({
      userId: req.user.sub,
      avatar: file
    });
  }
}
