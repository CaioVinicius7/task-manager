import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "@infra/database/database.module";
import { Storage } from "@infra/providers/storage/storage";
import { AuthenticationModule } from "@modules/authentication/authentication.module";
import { UsersRepository } from "@modules/users/repositories/users.repository";

import { PrismaUsersRepository } from "../repositories/prisma/users.prisma.repository";
import { CreateUserUseCase } from "../use-cases/create-user";
import { GetUserProfileUseCase } from "../use-cases/get-user-profile";
import { UploadUserAvatarUseCase } from "../use-cases/upload-user-avatar";
import { UserController } from "../users.controller";

describe("[POST] /users", () => {
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

  it("Should be create a user", async () => {
    const newUser = {
      name: "Caio",
      username: `Caio-${Math.random() * 10000}`,
      email: `${Math.random() * 10000}@gmail.com`,
      password: "@SuperSecret123"
    };

    const { statusCode, body } = await request(app.getHttpServer())
      .post("/users")
      .send(newUser);

    expect(statusCode).toEqual(201);
    expect(body.user).toEqual({
      id: expect.any(String),
      name: "Caio",
      username: newUser.username,
      email: newUser.email
    });
  });
});
