import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { User } from '../types/types';
import { UserService } from '../providers/user.service';
import { UserDto } from 'src/dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Post()
  addUser(@Body(ValidationPipe) createUserDto: UserDto) {
    const createdUser = this.userService.addUser(createUserDto);

    return {
      statusCode: 201,
      data: createdUser,
    };
  }
}
