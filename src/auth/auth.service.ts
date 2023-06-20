import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt.strategy';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload) {
    const user = (
      await this.usersService.findOneByPhone(payload.phone)
    ).orElseThrow(() => new UnauthorizedException('JWT không hợp lệ'));
    const { _id, name, role, phone, code, email } = user;
    return { _id, name, role, phone, code, email };
  }

  async login(dto: LoginDTO) {
    const user = (
      await this.usersService.findOneByPhone(dto.phone)
    ).orElseThrow(() => new BadRequestException('Số điện thoại không tồn tại'));

    await bcrypt.compare(dto.password, user.password).then((isMatch) => {
      if (!isMatch) throw new BadRequestException('Sai mật khẩu');
    });

    const payload: JwtPayload = {
      _id: user._id,
      phone: user.phone,
      code: user.code,
      role: user.role.toString(),
      email: user.email
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
