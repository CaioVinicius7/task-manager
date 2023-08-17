import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const assignTaskToUserParamsSchema = z.object({
  taskId: z.string().uuid({
    message: "TaskId must be a valid uuid."
  }),
  userId: z.string().uuid({
    message: "UserId must be a valid uuid."
  })
});

export class AssignTaskToUserParamsDTO extends createZodDto(
  assignTaskToUserParamsSchema
) {}
