import { Injectable } from '@nestjs/common';
import { albums } from '../db/db';
import { Album } from '../types/types';

@Injectable()
export class AlbumService {
  getAlbums(): Album[] {
    return albums;
  }
}
