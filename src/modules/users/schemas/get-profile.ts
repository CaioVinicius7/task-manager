import { z } from "nestjs-zod/z";

export const getProfileResponseSchema = z.object({
  id: z.string().uuid({
    message: "Id mus be a valid uuid."
  }),
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
  avatarUrl: z.string().nullable(),
  createdAt: z.coerce.date()
});

export type GetProfileResponseDTO = z.infer<typeof getProfileResponseSchema>;
