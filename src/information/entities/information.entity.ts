import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LargeNumberLike } from 'crypto';
import { Document, SchemaTypes } from 'mongoose';
import { Camera, CameraSchema } from 'src/cameras/entities/camera.entity';

@Schema({ versionKey: false })
export class Information extends Document {
  // @Prop()
  // score!: number;

  @Prop({ type: Date })
  timeStamp!: Date;

  @Prop()
  temperature!: number;

  @Prop()
  humidity!: number;

  // @Prop()
  // gas!: number;

  @Prop()
  ppm!: number;

  @Prop()
  vector: string;

  @Prop()
  image: string;

  @Prop()
  type: number;

  @Prop()
  code: number;

  @Prop()
  userId: number;

  @Prop()
  position: string;
}

export const InformationSchema = SchemaFactory.createForClass(Information);
