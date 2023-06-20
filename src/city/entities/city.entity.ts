import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  District,
  DistrictSchema,
} from 'src/district/entities/district.entity';

@Schema({ versionKey: false })
export class City {
  @Prop()
  name!: string;

  @Prop({ type: [{ type: DistrictSchema }], default: [] })
  districts!: District[];
}

export const CitySchema = SchemaFactory.createForClass(City);
