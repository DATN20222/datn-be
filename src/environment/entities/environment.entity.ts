import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Environment {

  @Prop({ type: Date })
  timeStamp!: Date;

  @Prop()
  temperature!: number;

  @Prop()
  humidity!: number;

  @Prop()
  ppm!: number;

  @Prop()
  count: number;

}

export const EnvironmentSchema = SchemaFactory.createForClass(Environment);
