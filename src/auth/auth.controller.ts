import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './jwt.guard';
import { LoginDTO } from './login.dto';
import { CurrentUser } from './whoami.decorator';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  async authenticate(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Get()
  @ApiBearerAuth()
  async currentUser(@CurrentUser() user: User) {
    return user;
  }
}
