import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InformationDto } from './dto/information.dto';
import { InformationService } from './information.service';

@Controller('information')
@ApiTags('Information')
@ApiBearerAuth()
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  // @Post()
  // create(@Body() createInformationDto: InformationDto) {
  //   return this.informationService.create(createInformationDto);
  // }

  // @Get()
  // findAll() {
  //   return this.informationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.informationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateInformationDto: InformationDto,
  // ) {
  //   return this.informationService.update(+id, updateInformationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.informationService.remove(+id);
  // }
}
