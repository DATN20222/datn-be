import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class VectorEntity{
  @Prop()
  cameraId: string;

  @Prop()
  vector: string;

  @Prop()
  userId: number;
}

export const VectorEntitySchema = SchemaFactory.createForClass(VectorEntity);