import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/permission/role.decorator';
import { Role } from 'src/auth/permission/role.enum';
import { ChangePermissionDto } from './dto/change-permission.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CurrentUser } from '../auth/whoami.decorator';
import { User } from './entities/user.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('accounts')
@ApiTags('Account Resource')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @Public()
  @HttpCode(201)
  register(@Body() dto: RegisterDto) {
    return this.usersService.createNewUser(dto);
  }

  @Patch('/password')
  @ApiBearerAuth()
  changePassword(@CurrentUser() user: User, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(user._id, dto);
  }

  @Post('reset-password/init')
  @Public()
  initForgetPassword(@Query('email') email: string) {
    return this.usersService.initResetPassword(email);
  }

  @Post('reset-password/finish')
  @Public()
  finishForgetPassword(@Body() dto: ResetPasswordDto) {
    return this.usersService.finishResetPassword(dto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  changePermission(@Param('id') id: string, @Body() body: ChangePermissionDto) {
    return this.usersService.changePermission(id, body.role);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @Get('/bycode/:code')
  @Public()
  getUserByCode(@Param('code') code: number){
    return this.usersService.getOneByCode(code);
  }

  @Get('/byid/:id')
  @ApiBearerAuth()
  getUserById(@Param('id') id: string){
    return this.usersService.getOneById(id);
  }
}
