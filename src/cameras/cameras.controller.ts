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
// import { start } from 'repl';
// import { Public } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/permission/role.decorator';
import { Role } from 'src/auth/permission/role.enum';
// import { InformationDto } from 'src/information/dto/information.dto';
import { CamerasService } from './cameras.service';
import { CameraDto } from './dto/camera.dto';
import { LatLngDto } from './dto/latlng.dto';

@Controller('cameras')
@ApiTags('Camera')
@ApiBearerAuth()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  create(@Body() createCameraDto: CameraDto) {
    return this.camerasService.create(createCameraDto);
  }

  @Get()
  findAll() {
    return this.camerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camerasService.findOne(id);
  }

  @Get('/ip/:ip/:start/:end')
  getEventsIpStartEnd(
    @Param('ip') ip: string,
    @Param('start') start: Date,
    @Param('end') end: Date,
  ) {
    return this.camerasService.getEventIp(ip, start, end);
  }

  @Get('/events/:start/:end')
  getEventsByTime(@Param('start') start: Date, @Param('end') end: Date) {
    return this.camerasService.getEventsByTime(start, end);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCameraDto: CameraDto) {
    return this.camerasService.update(id, updateCameraDto);
  }

  // @Patch('/event/:ip')
  // updateEvent(@Param('ip') ip: string, @Body() informationDto: InformationDto) {
  //   return this.camerasService.updateEvent(ip, informationDto);
  // }

  @Get('/ip/:ip')
  findOneByIp(@Param('ip') ip: string) {
    return this.camerasService.findOneByIp(ip);
  }

  @Get('/events/:ip')
  findEvent(@Param('ip') ip: string) {
    return this.camerasService.getLastInfor(ip);
  }

  @Get('/events')
  async findAllEvents() {
    return await this.camerasService.getEvents();
  }

  // @Post('/events/latlng')
  // async findAllEventsLatLng(@Body() latlngDto: LatLngDto) {
  //   return await this.camerasService.getEventsByLatLng(latlngDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camerasService.remove(id);
  }
}
