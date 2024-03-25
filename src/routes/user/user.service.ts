import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, User } from './models';
import Database from 'src/database/db.service';
@Injectable()
export class UserService {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  private hashPassword(password: string): string {
    const saltRounds = process.env.CRYPT_SALT || 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  getUsers(): User[] {
    return this.database.getUsers();
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

    this.database.addUser(newUser);
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

    const user = this.database.users.find((user) => user.id === id);
    if (!user) return undefined;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  deleteUser(id: string) {
    return this.database.deleteUser(id);
    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    const userIndex = this.database.users.findIndex(
      (user: User) => user.id === id,
    );
    if (userIndex === -1)
      throw new NotFoundException(`User with ID ${id} not found`);

    this.database.users.splice(userIndex, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    if (!oldPassword || !newPassword) {
      throw new BadRequestException(
        'Invalid oldPassword or newPassword provided. Please provide a valid fields.',
      );
    }
    const user = this.getUserById(id);
    const updatedUserIndex = user?.id;

    if (user?.password !== oldPassword) {
      throw new ForbiddenException(
        'Old password is incorrect. Please provide the correct old password.',
      );
    }

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    this.database.users[updatedUserIndex] = updatedUser;
    const response = { ...updatedUser };
    delete response.password;
    return response;
  }
}
