import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InformationDto } from './dto/information.dto';
import { Information } from './entities/information.entity';

@Injectable()
export class InformationService {
  constructor(
    @InjectModel(Information.name)
    private readonly informationModel: Model<Information>,
  ) {}
  // async create(informationDto: InformationDto) {
  //   return await this.informationModel.create(informationDto);
  // }

  // async findAll() {
  //   // return listInfor;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} information`;
  // }

  // update(id: number, updateInformationDto: InformationDto) {
  //   return `This action updates a #${id} information`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} information`;
  // }
}
