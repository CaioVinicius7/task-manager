import { hash } from "bcrypt";

import { JwtModule } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";

import { InMemoryUserRepository } from "@modules/users/repositories/in-memory/user.in-memory.repository";
import { UserRepository } from "@modules/users/repositories/user.repository";

import { InvalidCredentials } from "../errors/invalid-credentials";
import { SignInUseCase } from "../sing-in";

describe("SignInUseCase", () => {
  let sut: SignInUseCase;
  let usersRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: "1h"
          }
        })
      ],
      providers: [
        SignInUseCase,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<SignInUseCase>(SignInUseCase);
    usersRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it("Should be able to sign in", async () => {
    const newUser = {
      name: "Caio",
      username: "CaioVinícius7",
      email: "caio@gmail.com",
      password: "@SuperSecret123"
    };

    const passwordHashed = await hash(newUser.password, 10);

    usersRepository.save({
      ...newUser,
      password: passwordHashed
    });

    const { accessToken } = await sut.execute({
      username: newUser.username,
      password: newUser.password
    });

    expect(accessToken).toBeTruthy();
  });

  it("Should not be able to sign in with a user that doesn't exist", async () => {
    await expect(() =>
      sut.execute({
        username: "fake-user",
        password: "fake-password"
      })
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });

  it("Should not be able to sign in with incorrect password", async () => {
    const newUser = {
      name: "User 2",
      username: "user 2",
      email: "user@gmail.com",
      password: "@SuperSecret123"
    };

    const passwordHashed = await hash(newUser.password, 10);

    usersRepository.save({
      ...newUser,
      password: passwordHashed
    });

    await expect(() =>
      sut.execute({
        username: newUser.username,
        password: "fake-password"
      })
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });
});
