import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { District, DistrictSchema } from './entities/district.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: District.name,
        useFactory: () => {
          const schema = DistrictSchema;
          schema.plugin(require('mongoose-unique-validator'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [DistrictService],
})
export class DistrictModule {}
