export abstract class Storage {
  abstract upload(
    file: Express.Multer.File,
    folder: string
  ): Promise<{ path: string }>;
}
