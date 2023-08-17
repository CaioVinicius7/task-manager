import { BadRequestException } from "@nestjs/common";

export class NotAssigned extends BadRequestException {
  constructor() {
    super("Task and user are not assigned.");
  }
}
