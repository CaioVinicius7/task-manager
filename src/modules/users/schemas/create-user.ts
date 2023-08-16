import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const createUserSchema = z.object({
  name: z.string({
    required_error: "Name is required."
  }),
  username: z.string({
    required_error: "Username is required."
  }),
  email: z
    .string({
      required_error: "Email is required."
    })
    .email(),
  password: z.string({
    required_error: "Password is required."
  })
});

export class CreateUserDTO extends createZodDto(createUserSchema) {}

export const createUserResponseSchema = createUserSchema
  .extend({
    id: z.string().uuid({
      message: "Id must be a valid uuid."
    })
  })
  .omit({
    password: true
  });

export type CreateUserResponseDTO = z.infer<typeof createUserResponseSchema>;
