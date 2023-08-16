import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const signInSchema = z.object({
  username: z.string({
    required_error: "Username is required."
  }),

  password: z.string({
    required_error: "Password is required."
  })
});

export class SignInSchemaDTO extends createZodDto(signInSchema) {}
