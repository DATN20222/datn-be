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
import { DistrictService } from './district.service';
import { DistrictDto } from './dto/district.dto';

@Controller('district')
@Public()
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  create(@Body() createDistrictDto: DistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.districtService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDistrictDto: DistrictDto) {
  //   return this.districtService.update(+id, updateDistrictDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
