import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { model, Model } from "mongoose";
import { Category, CategoryDocument } from "src/schema";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>) {}
    async create(dto: CreateCategoryDto) {
        let category = await this.model.findOne({name: dto.name})
        if(category) throw new HttpException('found this category', HttpStatus.FOUND)
        try {
            category = await this.model.create({
                name: dto.name,
                href: dto.href
            })
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
        return category
    }

    async getAllCategory() {
        return
    }

    async getCategoryById(id: string) {
        return 
    }

    async updateCategory( dto: UpdateCategoryDto) {
        return 
    }

    async deleteCategory(id: string) {
        return
    }
}