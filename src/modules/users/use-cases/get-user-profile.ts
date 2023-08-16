import { Injectable } from "@nestjs/common";

import { UsersRepository } from "../repositories/users.repository";

@Injectable()
export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    return {
      user
    };
  }
}
