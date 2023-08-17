import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const unassignTaskFromUserParamsSchema = z.object({
  taskId: z.string().uuid({
    message: "TaskId must be a valid uuid."
  }),
  userId: z.string().uuid({
    message: "UserId must be a valid uuid."
  })
});

export class UnassignTaskFromUserParamsDTO extends createZodDto(
  unassignTaskFromUserParamsSchema
) {}
