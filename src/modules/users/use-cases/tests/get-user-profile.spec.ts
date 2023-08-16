import { Test } from "@nestjs/testing";

import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/users.in-memory.repository";
import { UsersRepository } from "@modules/users/repositories/users.repository";

import { CreateUserUseCase } from "../create-user";
import { GetUserProfileUseCase } from "../get-user-profile";

describe("GetUserProfileUseCase", () => {
  let sut: GetUserProfileUseCase;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        GetUserProfileUseCase,
        {
          provide: UsersRepository,
          useClass: InMemoryUsersRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<GetUserProfileUseCase>(GetUserProfileUseCase);
    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
  });

  it("Should be able to get user profile", async () => {
    const newUser = {
      name: "Caio",
      username: "CaioVinícius7",
      email: "caio@gmail.com",
      password: "@SuperSecret123"
    };

    const createdUser = await usersRepository.save(newUser);

    const { user } = await sut.execute(createdUser.id);

    expect(user.name).toEqual("Caio");
    expect(user.username).toEqual("CaioVinícius7");
    expect(user.email).toEqual("caio@gmail.com");
  });
});
