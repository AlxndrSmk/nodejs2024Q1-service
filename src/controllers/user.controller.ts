import { Controller, Get } from '@nestjs/common';
import { User } from '../types/types';
import { UserService } from '../providers/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }
}
