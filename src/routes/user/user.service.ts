import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from './models';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/typeORM/entities/user';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly database: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.database.find({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @UsePipes(new ValidationPipe())
  async addUser(userDto: CreateUserDto): Promise<User> {
    return await this.database.save({ ...userDto }).catch(() => {
      return this.database.findOne({
        where: {
          login: userDto.login,
          password: userDto.password,
        },
        select: {
          id: true,
          login: true,
          createdAt: true,
          updatedAt: true,
          version: true,
        },
      });
    });
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user = await this.database.findOne({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: id,
      },
    });

    return user;
  }

  async deleteUser(id: string) {
    return await this.database.delete(id).then((result) => {
      if (result.affected === 0) return false;

      return true;
    });
  }

  public async updatePassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<User | null | undefined> {
    const user = await this.database.findOne({
      where: {
        id: id,
      },
      select: {
        password: true,
      },
    });

    if (!user) return undefined;
    if (user.password !== dto.oldPassword) return null;

    return await this.database
      .update(
        { id: id, password: dto.oldPassword },
        { password: dto.newPassword },
      )
      .then(() => {
        return this.database.findOne({
          where: {
            id: id,
          },
          select: {
            id: true,
            login: true,
            version: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      });
  }
}
