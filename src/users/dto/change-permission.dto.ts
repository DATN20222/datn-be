import { IsEnum } from 'class-validator';
import { Role } from 'src/auth/permission/role.enum';

export class ChangePermissionDto {
  @IsEnum(Role)
  role!: Role;

  code: number;
}
