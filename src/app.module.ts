import { Module } from "@nestjs/common";

import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { UserModule } from "./modules/users/user.module";

@Module({
  imports: [UserModule, AuthenticationModule],
  controllers: [],
  providers: []
})
export class AppModule {}
