import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddDistrictDto } from './dto/add-district.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private readonly cityModule: Model<City>,
  ) {}
  create(createCityDto: CreateCityDto) {
    return this.cityModule.create(createCityDto);
  }

  async findAll() {
    return await this.cityModule.find().exec();
  }

  async findOneByName(name: string) {
    return await this.cityModule.find({ name: name }).exec();
  }

  async getList() {
    const cities = await this.findAll();
    let listcity = [];
    cities.map((value) => listcity.push({ id: value._id, name: value.name }));
    return listcity;
  }

  async findDistrictsByName(name: string) {
    const city = await this.findOneByName(name);
    if (city != null && city != undefined && city.length != 0)
      return city[0].districts;
    return [];
  }

  findOne(id: string) {
    return this.cityModule.findById(id).exec();
  }

  async update(id: string, updateCityDto: AddDistrictDto) {
    const city = await this.cityModule.findById(id).exec();
    city.districts = city.districts.concat(updateCityDto.districts);
    console.log(city.districts);

    return await city.save();
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
