import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "@infra/database/database.module";
import { Storage } from "@infra/providers/storage/storage";
import { AuthenticationModule } from "@modules/authentication/authentication.module";
import { UsersRepository } from "@modules/users/repositories/users.repository";
import { createAndAuthNewUser } from "@test/helpers/create-and-auth-new-user";

import { PrismaUsersRepository } from "../repositories/prisma/users.prisma.repository";
import { CreateUserUseCase } from "../use-cases/create-user";
import { GetUserProfileUseCase } from "../use-cases/get-user-profile";
import { UploadUserAvatarUseCase } from "../use-cases/upload-user-avatar";
import { UserController } from "../users.controller";

describe("[GET] /users/profile", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthenticationModule, DatabaseModule],
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
          useValue: {
            upload: jest.fn()
          }
        }
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to get user profile", async () => {
    const { user, accessToken } = await createAndAuthNewUser(app);

    const { statusCode, body } = await request(app.getHttpServer())
      .get("/users/profile")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(statusCode).toBe(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        name: user.name,
        username: user.username,
        email: user.email,
        avatarUrl: null
      })
    );
  });
});
