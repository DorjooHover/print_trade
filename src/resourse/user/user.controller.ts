import { Controller, Delete, Post } from "@nestjs/common";
import { Body } from "@nestjs/common/decorators";
import {  ApiTags } from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('auth')
export class UserController {
    constructor(private readonly service: UserService) {}
    @Post('register')
    async register(@Body() dto: UserDto) {
        let user =  await this.service.register(dto.username, dto.password)
        if(user) {
            const token = await this.service.signPayload(user.username)
            return {user, token}
        }
    }
    @Post('login')
    async login(@Body() dto: UserDto) {
        const user = await this.service.login(dto.username, dto.password)
        if(user) {
            const token = await this.service.signPayload(user.username)
            return {user, token}
        }
    }

    @Delete() 
    async delete() {
        return this.service.deleteAllUser()
    }
}