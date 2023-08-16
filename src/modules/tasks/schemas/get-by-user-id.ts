import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const getTaskByUserIdSchema = z.object({
  userId: z
    .string({
      required_error: "UserId is required."
    })
    .uuid({
      message: "UserId should be a valid uuid."
    })
});

export class GetTaskByUserIdDTO extends createZodDto(getTaskByUserIdSchema) {}
