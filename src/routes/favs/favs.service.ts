import { Injectable } from '@nestjs/common';
import { Favorites } from '../../types/types';
import Database from 'src/database/db.service';

@Injectable()
export class FavsService {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  getFavs(): Favorites[] {
    return this.database.favs;
  }
}
