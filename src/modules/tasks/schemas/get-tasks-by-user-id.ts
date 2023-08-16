import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const getTasksByUserIdSchema = z.object({
  userId: z
    .string({
      required_error: "UserId is required."
    })
    .uuid({
      message: "UserId should be a valid uuid."
    })
});

export class GetTasksByUserIdDTO extends createZodDto(getTasksByUserIdSchema) {}
