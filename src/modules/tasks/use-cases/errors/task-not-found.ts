import { NotFoundException } from "@nestjs/common";

export class TaskNotFound extends NotFoundException {
  constructor() {
    super("Task not found.");
  }
}
