import { BadRequestException } from "@nestjs/common";

export class AlreadyAssigned extends BadRequestException {
  constructor() {
    super("Already assigned.");
  }
}
