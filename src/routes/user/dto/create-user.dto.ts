import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from '../models';

export class UserDto implements CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
