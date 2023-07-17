import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/permission/role.enum';
import { IsEmail, IsEnum } from 'class-validator';
import { HistoryEntity, HistoryEntitySchema } from './history.entity';
import { VectorEntity, VectorEntitySchema } from './vectors.entity';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ type: String })
  name!: string;

  @Prop({ unique: true, required: true, sparse: true, type: String })
  phone!: string;

  @Prop({ type: String })
  password!: string;

  @Prop({type: Date})
  birthday!: Date;

  @IsEmail()
  @Prop({ unique: true, required: false, sparse: true, type: String })
  email!: string;

  @IsEnum(Role)
  @Prop({ enum: Role, default: Role.NO_ROLE, type: () => Role })
  role!: Role;

  @Prop({ unique: true, required: false, sparse: true, type: String })
  otp?: string;

  @Prop({ type: Date })
  otpExpired?: Date;

  @Prop({type: [{type: VectorEntitySchema}], default: []})
  vectors: VectorEntity[];

  @Prop()
  code: number;

  @Prop({ type: Date, default: new Date() })
  updateTime!: Date;

  //luu lich su xuat hien
  @Prop({type: [{ type: HistoryEntitySchema}], default: []})
  history: HistoryEntity[];
}

export const UserSchema = SchemaFactory.createForClass(User);
