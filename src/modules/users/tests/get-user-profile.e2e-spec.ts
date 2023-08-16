import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "@infra/database/database.module";
import { Storage } from "@infra/providers/storage/storage";
import { AuthenticationModule } from "@modules/authentication/authentication.module";
import { UserRepository } from "@modules/users/repositories/user.repository";

import { PrismaUserRepository } from "../repositories/prisma/user.prisma.repository";
import { CreateUserUseCase } from "../use-cases/create-user";
import { GetUserProfileUseCase } from "../use-cases/get-user-profile";
import { UploadUserAvatarUseCase } from "../use-cases/upload-user-avatar";
import { UserController } from "../user.controller";

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
          provide: UserRepository,
          useClass: PrismaUserRepository
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
    const newUser = {
      name: "Caio",
      username: `Caio-${Math.random() * 10000}`,
      email: `${Math.random() * 10000}@gmail.com`,
      password: "@SuperSecret123"
    };

    await request(app.getHttpServer()).post("/users").send(newUser);

    const {
      body: { accessToken }
    } = await request(app.getHttpServer()).post("/sign-in").send({
      username: newUser.username,
      password: newUser.password
    });

    const { statusCode, body } = await request(app.getHttpServer())
      .get("/users/profile")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(statusCode).toBe(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        avatarUrl: null
      })
    );
  });
});
