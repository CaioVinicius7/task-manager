import { Request } from "express";
import { zodToOpenAPI } from "nestjs-zod";

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
import { ApiBody, ApiTags, ApiResponse } from "@nestjs/swagger";

import { Public } from "@infra/decorators/public.decorator";
import { AuthGuard } from "@infra/providers/auth-guard";

import {
  CreateUserResponseSchema,
  CreateUserDTO,
  CreateUserSchema
} from "./schemas/create-user";
import { GetProfileResponseSchema } from "./schemas/get-profile";
import { CreateUserUseCase } from "./use-cases/create-user";
import { GetUserProfileUseCase } from "./use-cases/get-user-profile";
import { UploadUserAvatarUseCase } from "./use-cases/upload-user-avatar";

const createUserSchemaForSwagger = zodToOpenAPI(CreateUserSchema);
const createUserResponseSchemaForSwagger = zodToOpenAPI(
  CreateUserResponseSchema
);

@Controller("/users")
@ApiTags("users")
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly uploadUserAvatarUseCase: UploadUserAvatarUseCase
  ) {}

  @Post()
  @Public()
  @ApiBody({
    schema: createUserSchemaForSwagger,
    description: "Endpoint to create new user"
  })
  @ApiResponse({
    status: 201,
    description: "Created",
    schema: createUserResponseSchemaForSwagger
  })
  @ApiResponse({
    status: 400,
    description: "User with requested username or email already exists"
  })
  async create(@Body() { name, username, email, password }: CreateUserDTO) {
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
  async getProfile(@Req() request: Request) {
    const { user } = await this.getUserProfileUseCase.execute(request.user.sub);

    const formattedUser = GetProfileResponseSchema.parse(user);

    return {
      user: formattedUser
    };
  }

  @Patch("/avatar")
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
