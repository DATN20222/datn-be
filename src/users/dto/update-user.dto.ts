
import { IsEmail, IsEnum } from "class-validator";
import { Role } from "src/auth/permission/role.enum";

export class UpdateUserDto{
  
  name: string;

  phone: string;


  role: Role;

  code: number;

  birthday: Date;

  email: string;

}