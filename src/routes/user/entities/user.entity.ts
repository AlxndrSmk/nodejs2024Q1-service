import { CreateUserDto } from 'src/routes/user/models';
import { v4 as uuid } from 'uuid';

class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor({ password, login }: CreateUserDto) {
    this.id = uuid();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
    this.version = this.version += 1;
    this.updatedAt = Date.now();
  }
}

export default User;
