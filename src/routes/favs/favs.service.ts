import { Injectable } from '@nestjs/common';
import { favs } from '../../database/db';
import { Favorites } from '../../types/types';

@Injectable()
export class FavsService {
  getFavs(): Favorites[] {
    return favs;
  }
}
