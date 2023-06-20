import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Stall {
  @Prop()
  name!: string;
  @Prop()
  camIp!: string;
  @Prop()
  lng!: number;
}

export const StallSchema = SchemaFactory.createForClass(Stall);
