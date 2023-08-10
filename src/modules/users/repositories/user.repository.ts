import type {
  CreateUserDTO,
  CreatedUser,
  UsernameAndEmail
} from "../dto/create-user.dto";

export abstract class UserRepository {
  abstract findByUsernameOrEmail(
    data: UsernameAndEmail
  ): Promise<CreatedUser | null>;
  abstract save(data: CreateUserDTO): Promise<CreatedUser>;
  abstract findById(id: string): Promise<CreatedUser | null>;
  abstract findByUsername(username: string): Promise<CreatedUser | null>;
}
