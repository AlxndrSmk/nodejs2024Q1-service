import { Injectable } from '@nestjs/common';
import { users } from '../db/db';
import { User } from '../types/types';

@Injectable()
export class UserService {
  getUsers(): User[] {
    return users;
  }
}
