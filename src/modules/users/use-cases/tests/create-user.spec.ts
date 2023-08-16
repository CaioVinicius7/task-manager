import { Test } from "@nestjs/testing";

import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/users.in-memory.repository";
import { UsersRepository } from "@modules/users/repositories/users.repository";

import { CreateUserUseCase } from "../create-user";
import { UserAlreadyExists } from "../errors/user-already-exists";

describe("CreateUserUseCase", () => {
  let sut: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UsersRepository,
          useClass: InMemoryUsersRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it("Should be able to create a new user", async () => {
    const newUser = {
      name: "Caio",
      username: "CaioVinícius7",
      email: "caio@gmail.com",
      password: "@SuperSecret123"
    };

    const { user } = await sut.execute(newUser);

    expect(user).toHaveProperty("id");
    expect(user.avatarUrl).toBeNull();
  });

  it("Should not be able to create a new user if username already exists", async () => {
    const newUser = {
      name: "User 1",
      username: "UsernameAlreadyExists",
      email: "user1@gmail.com",
      password: "@SuperSecret123"
    };

    await sut.execute(newUser);

    const newUserWithExistentUsername = {
      name: "User 2",
      username: "UsernameAlreadyExists",
      email: "user2@gmail.com",
      password: "@SuperSecret123"
    };

    await expect(() =>
      sut.execute(newUserWithExistentUsername)
    ).rejects.toBeInstanceOf(UserAlreadyExists);
  });

  it("Should not be able to create a new user if email already exists", async () => {
    const newUser = {
      name: "User 1",
      username: "user 1",
      email: "email.already.exists@gmail.com",
      password: "@SuperSecret123"
    };

    await sut.execute(newUser);

    const newUserWithExistentEmail = {
      name: "User 2",
      username: "user 2",
      email: "email.already.exists@gmail.com",
      password: "@SuperSecret123"
    };

    await expect(() =>
      sut.execute(newUserWithExistentEmail)
    ).rejects.toBeInstanceOf(UserAlreadyExists);
  });
});
