import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  Environment,
  EnvironmentSchema,
} from 'src/environment/entities/environment.entity';
import {
  Information,
  InformationSchema,
} from 'src/information/entities/information.entity';
import { CheckInEntity, CheckInEntitySchema } from './checkin.entity';

@Schema({ versionKey: false })
export class Camera extends Document {
  @Prop()
  name!: string;

  @Prop()
  room!: string;

  @Prop()
  ip!: string;

  @Prop()
  status!: string;

  @Prop()
  type!: string;

  @Prop({ type: [{ type: EnvironmentSchema }], default: [] })
  event!: Environment[];

  @Prop({ default: '' })
  image!: string;

  @Prop({ type: Date })
  timeStamp!: Date;

  @Prop()
  count: number;

  @Prop()
  temperature: number;

  @Prop()
  humidity: number;

  @Prop()
  ppm!: number;
  
  @Prop({ type: [{ type: CheckInEntitySchema }], default: [] })
  checkIn: CheckInEntity[];
}

export const CameraSchema = SchemaFactory.createForClass(Camera);
