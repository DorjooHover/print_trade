import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";
import { MongooseModule } from "@nestjs/mongoose";
import appConfig from "src/config/app.config";

import { User, UserSchema } from "src/schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Global()
@Module({
    imports: [JwtModule.register({
        secretOrPrivateKey: appConfig().appSecret, signOptions: {expiresIn: 60 * 60 * 24}
    }), MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {}