import {
  Injectable,
  PipeTransform,
  UnprocessableEntityException
} from "@nestjs/common";

import { CreateUserDTO } from "../dto/create-user.dto";

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform({ name, email, password, username }: CreateUserDTO) {
    if (!name && !email && !password && !username) {
      throw new UnprocessableEntityException(
        `[name, email, username, password] is required`
      );
    }

    return {
      name,
      email,
      username,
      password
    };
  }
}
