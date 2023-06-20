import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class District {
  @Prop()
  name!: string;
  @Prop()
  lat!: number;
  @Prop()
  lng!: number;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
