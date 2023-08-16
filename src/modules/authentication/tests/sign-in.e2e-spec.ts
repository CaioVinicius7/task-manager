import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "@infra/database/database.module";
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/users.prisma.repository";
import { UsersRepository } from "@modules/users/repositories/users.repository";
import { UserModule } from "@modules/users/users.module";

import { AuthenticationController } from "../authentication.controller";
import { SignInUseCase } from "../use-cases/sing-in";

describe("[POST] /sign-in", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: "1h"
          }
        }),
        DatabaseModule,
        UserModule
      ],
      controllers: [AuthenticationController],
      providers: [
        SignInUseCase,

        {
          provide: UsersRepository,
          useClass: PrismaUsersRepository
        }
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to sign in", async () => {
    const newUser = {
      name: "Caio",
      username: `Caio-${Math.random() * 10000}`,
      email: `${Math.random() * 10000}@gmail.com`,
      password: "@SuperSecret123"
    };

    await request(app.getHttpServer()).post("/users").send(newUser);

    const { statusCode, body } = await request(app.getHttpServer())
      .post("/sign-in")
      .send({
        username: newUser.username,
        password: newUser.password
      });

    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty("accessToken");
  });
});
