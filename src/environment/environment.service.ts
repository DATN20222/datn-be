import { Injectable } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { Environment } from './entities/environment.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EnvironmentService {
  constructor(
    @InjectModel(Environment.name)
    private readonly environmentModel: Model<Environment>,
  ){};
  create(createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentModel.create(createEnvironmentDto);
  }

  findAll() {
    return `This action returns all environment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} environment`;
  }

  update(id: number, updateEnvironmentDto: UpdateEnvironmentDto) {
    return `This action updates a #${id} environment`;
  }

  remove(id: number) {
    return `This action removes a #${id} environment`;
  }
}
