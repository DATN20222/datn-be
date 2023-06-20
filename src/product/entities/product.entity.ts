import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Product {
  @Prop()
  name!: string;
  @Prop()
  description!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
