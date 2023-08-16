import { randomUUID } from "node:crypto";

import { CreatedUser, CreateUser } from "@modules/users/dto/create-user.dto";
import { UsernameAndEmail } from "@modules/users/dto/find-by-username-or-email.dto";

import { UsersRepository } from "../users.repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: CreatedUser[] = [];

  async findByUsernameOrEmail({
    email,
    username
  }: UsernameAndEmail): Promise<CreatedUser | null> {
    const user = this.users.find(
      (user) => user.username === username || user.email === email
    );

    return user ?? null;
  }

  async save({
    name,
    username,
    email,
    password
  }: CreateUser): Promise<CreatedUser> {
    const newUser: CreatedUser = {
      id: randomUUID(),
      name,
      username,
      email,
      password,
      avatarUrl: null,
      createdAt: new Date()
    };

    this.users.push(newUser);

    return newUser;
  }

  async findById(id: string): Promise<CreatedUser | null> {
    const user = this.users.find((user) => user.id === id);

    return user ?? null;
  }

  async findByUsername(username: string): Promise<CreatedUser | null> {
    const user = this.users.find((user) => user.username === username);

    return user ?? null;
  }

  async updateAvatarUrl(id: string, avatarUrl: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex >= 0) {
      this.users[userIndex].avatarUrl = avatarUrl;
    }
  }
}
