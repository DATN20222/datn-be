import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DistrictDto } from './dto/district.dto';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name)
    private readonly districtModel: Model<District>,
  ) {}
  create(createDistrictDto: DistrictDto) {
    const district = new this.districtModel(createDistrictDto);
    return district.save();
  }

  async findAll() {
    return await this.districtModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} district`;
  }

  update(id: number, updateDistrictDto: DistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
