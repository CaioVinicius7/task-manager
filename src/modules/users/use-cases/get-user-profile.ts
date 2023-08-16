import { Injectable } from "@nestjs/common";

import { UsersRepository } from "../repositories/users.repository";

@Injectable()
export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    return {
      user
    };
  }
}
