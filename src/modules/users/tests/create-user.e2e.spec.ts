import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { PrismaService } from "@infra/database/prisma.service";
import { Storage } from "@infra/providers/storage/storage";
import { AuthenticationModule } from "@modules/authentication/authentication.module";
import { UserRepository } from "@modules/users/repositories/user.repository";

import { PrismaUserRepository } from "../repositories/prisma/user.prisma.repository";
import { CreateUserUseCase } from "../use-cases/create-user";
import { GetUserProfileUseCase } from "../use-cases/get-user-profile";
import { UploadUserAvatarUseCase } from "../use-cases/upload-user-avatar";
import { UserController } from "../user.controller";

jest.mock("@infra/providers/storage/supabase/supabase-storage");

describe("[POST] /users", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthenticationModule],
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
      name: "Caio",
      username: newUser.username,
      email: newUser.email
    });
  });
});
