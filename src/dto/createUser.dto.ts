import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from 'src/types/types';

export class UserDto implements CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
