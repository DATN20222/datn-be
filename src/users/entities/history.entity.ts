import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class HistoryEntity{
  @Prop()
  cameraId: string;
  @Prop({type: Date})
  timeStamp!: Date;
  @Prop()
  position: string;
  @Prop()
  userId: number;
}

export const HistoryEntitySchema = SchemaFactory.createForClass(HistoryEntity);