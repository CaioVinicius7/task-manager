import { Test } from "@nestjs/testing";

import { InMemoryUserRepository } from "@modules/users/repositories/in-memory/user.in-memory.repository";
import { UserRepository } from "@modules/users/repositories/user.repository";

import { CreateUserUseCase } from "../create-user";
import { GetUserProfileUseCase } from "../get-user-profile";

describe("GetUserProfileUseCase", () => {
  let sut: GetUserProfileUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        GetUserProfileUseCase,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<GetUserProfileUseCase>(GetUserProfileUseCase);
    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it("Should be able to get user profile", async () => {
    const newUser = {
      name: "Caio",
      username: "CaioVinícius7",
      email: "caio@gmail.com",
      password: "@SuperSecret123"
    };

    const { user: CreatedUser } = await createUserUseCase.execute(newUser);

    const { user } = await sut.execute(CreatedUser.id);

    expect(user.name).toEqual("Caio");
    expect(user.username).toEqual("CaioVinícius7");
    expect(user.email).toEqual("caio@gmail.com");
  });
});
