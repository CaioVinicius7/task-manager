import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Task Manager")
    .setDescription("Api for task management")
    .setVersion("1.0")
    .setContact(
      "Caio Vinícius",
      "https://github.com/caiovinicius7",
      "caio1525pereira@gmail.com"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api-docs", app, document);

  await app.listen(3333);
}

bootstrap();
