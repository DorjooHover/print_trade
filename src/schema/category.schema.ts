import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"


export type CategoryDocument = Document & Category 
@Schema({timestamps: true})
export class Category {
    @Prop({required: true})
    name: string
    @Prop({required: true})
    href: string
}
export const CategorySchema = SchemaFactory.createForClass(Category)
