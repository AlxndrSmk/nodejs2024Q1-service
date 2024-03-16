import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
  async getUserById(@Param('id') userId: string): Promise<User> {
    const user = this.userService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    return await user;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addUser(@Body(ValidationPipe) createUserDto: UserDto) {
    const newUser = await this.userService.addUser(createUserDto);
    delete newUser['password'];
    return newUser;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.updatePassword(id, updateUserDto);

    if (result === null)
      throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);

    if (!result)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return result;
  }
}
