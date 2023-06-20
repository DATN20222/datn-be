import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class CheckInEntity{
  @Prop()
  userId: string;
  @Prop({type: Date})
  timeStamp!: Date;
}

export const CheckInEntitySchema = SchemaFactory.createForClass(CheckInEntity);