import { Injectable } from "@nestjs/common";

import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    return {
      user
    };
  }
}
