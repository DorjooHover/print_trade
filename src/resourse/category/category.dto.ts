import { ApiProperty } from "@nestjs/swagger";
import {IsString, IsNotEmpty} from 'class-validator'
export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    href: string
    
}

export class UpdateCategoryDto {
    @ApiProperty()
    @IsString()
    // @IsNotEmpty()
    name: string
    
    @ApiProperty()
    // @IsNotEmpty()
    @IsString()
    href: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string

}