import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string
    @ApiProperty({minLength: 6})
    @IsString()
    @IsNotEmpty()
    password: string

}