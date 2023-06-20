import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/auth/jwt.guard';
import { CityService } from './city.service';
import { AddDistrictDto } from './dto/add-district.dto';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('city')
@Public()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get('/name')
  findList() {
    return this.cityService.getList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Get('/districts/:name')
  findOneByName(@Param('name') name: string) {
    return this.cityService.findDistrictsByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: AddDistrictDto) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
