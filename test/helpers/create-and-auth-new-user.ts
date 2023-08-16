import * as request from "supertest";

import { INestApplication } from "@nestjs/common";

export async function createAndAuthNewUser(app: INestApplication) {
  const newUser = {
    name: "Caio",
    username: `Caio-${Math.random() * 10000}`,
    email: `${Math.random() * 10000}@gmail.com`,
    password: "@SuperSecret123"
  };

  const {
    body: { user }
  } = await request(app.getHttpServer()).post("/users").send(newUser);

  const {
    body: { accessToken }
  } = await request(app.getHttpServer()).post("/sign-in").send({
    username: newUser.username,
    password: newUser.password
  });

  return {
    user,
    accessToken
  };
}
