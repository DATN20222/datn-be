import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/auth/permission/role.enum';

export class AddUserByAdminDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsEmail()
  @IsString()
  email!: string;

  code: number;

  birthday: Date;
  
  @IsEnum(Role)
  role!: Role;
  
}
