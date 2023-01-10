import { Body, Controller, Delete, Get, HttpException, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserAccessGuard } from "src/guard/user.guard";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";
import { CategoryService } from "./category.service";

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(private service: CategoryService) {} 
    @UseGuards(UserAccessGuard)
    @ApiBearerAuth('access-token')
    @Post()
    createCategory(@Request() {user},  @Body() dto: CreateCategoryDto) {

        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", 403)
        return this.service.create(dto)
    }

    @Get()
    getAllCategory() {
        return this.service.getAllCategory()
    }

    @Get(":id")
    @ApiQuery({name: 'id'})
    getCategoryById(@Query('id') id) {
        console.log(id)
        return this.service.getCategoryById(id)
    }

    @Put()
    updateCategoryId(@Body() dto: UpdateCategoryDto) {
        return this.service.updateCategory( dto)
    }

    @Delete(":id")
    @ApiQuery({name: 'id'})
    deleteCategoryById(@Query('id') id) {
        return this.deleteCategoryById(id)
    }
}
