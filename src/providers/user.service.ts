import {
  BadRequestException,
  ConflictException,
  Injectable,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../db/db';
import { CreateUserDto, User } from '../types/types';

@Injectable()
export class UserService {
  getUsers(): User[] {
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  @UsePipes(new ValidationPipe())
  addUser(createUserDto: CreateUserDto): User {
    const { login, password } = createUserDto;
    const userExists = users.find((user) => user.login === login);

    if (userExists) throw new ConflictException('User already exists');
    if (!login || !password) {
      throw new BadRequestException('Login and password are required');
    }

    const newUser = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    users.push(newUser);
    const userResponse = { ...newUser };
    delete userResponse.password;

    return userResponse;
  }
}
