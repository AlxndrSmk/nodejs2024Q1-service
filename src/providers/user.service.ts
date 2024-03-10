import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { users } from '../db/db';
import { CreateUserDto, UpdatePasswordDto, User } from '../types/types';

@Injectable()
export class UserService {
  private hashPassword(password: string): string {
    const saltRounds = process.env.CRYPT_SALT || 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  getUsers(): User[] {
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  @UsePipes(new ValidationPipe())
  addUser(createUserDto: CreateUserDto): User {
    const { login, password } = createUserDto;

    if (!login || !password) {
      throw new BadRequestException('Login and password are required');
    }

    const hashedPassword = this.hashPassword(password);

    const newUser: User = {
      id: uuidv4(),
      login,
      password: hashedPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    users.push(newUser);
    const userResponse = { ...newUser };
    delete userResponse.password;

    return userResponse;
  }

  getUserById(id: string): User | undefined {
    if (
      !id.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      )
    ) {
      throw new BadRequestException('userId is not a valid uuid');
    }

    const user = users.find((user) => user.id === id);
    if (!user) return undefined;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  deleteUser(id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    const userIndex = users.findIndex((user: User) => user.id === id);
    if (userIndex === -1)
      throw new NotFoundException(`User with ID ${id} not found`);

    users.splice(userIndex, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = users.find((user) => user.id === id);

    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    if ((!uuidValidate(id) && !user) || !user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isPasswordMatch = bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new ConflictException('Old password is incorrect');
    }

    user.password = this.hashPassword(updatePasswordDto.newPassword);
    user.updatedAt = Date.now();
    user.version = user.version + 1;

    const userResponse = { ...user };
    delete userResponse.password;

    return userResponse;
  }
}
