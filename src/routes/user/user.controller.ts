import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/routes/user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') userId: string): User {
    const user = this.userService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  addUser(@Body(ValidationPipe) createUserDto: UserDto) {
    return this.userService.addUser(createUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updatePassword(id, updateUserDto);
  }
}
