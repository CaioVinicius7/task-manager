export class CreateUserDTO {
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
  createdAt: Date;
}

export interface UsernameAndEmail {
  username: string;
  email: string;
}
