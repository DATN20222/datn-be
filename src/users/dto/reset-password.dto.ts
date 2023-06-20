import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  otp!: string;

  @IsNotEmpty()
  @IsString()
  newPassword!: string;
}
