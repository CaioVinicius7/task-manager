import type { CreateUser, CreatedUser } from "../dto/create-user.dto";
import type { UsernameAndEmail } from "../dto/find-by-username-or-email.dto";

export abstract class UserRepository {
  abstract findByUsernameOrEmail(
    data: UsernameAndEmail
  ): Promise<CreatedUser | null>;
  abstract save(data: CreateUser): Promise<CreatedUser>;
  abstract findById(id: string): Promise<CreatedUser | null>;
  abstract findByUsername(username: string): Promise<CreatedUser | null>;
  abstract updateAvatarUrl(id: string, avatarUrl: string): Promise<void>;
}
