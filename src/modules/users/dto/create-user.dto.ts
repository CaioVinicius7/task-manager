export interface CreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface CreatedUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  createdAt: Date;
}
