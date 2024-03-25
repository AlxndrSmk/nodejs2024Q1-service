import { IsNotEmpty, MinLength } from 'class-validator';
import { UpdatePasswordDto } from '../models';

export class UpdateUserDto implements UpdatePasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
