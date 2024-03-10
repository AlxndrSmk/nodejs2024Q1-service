import { Injectable } from '@nestjs/common';
import { albums } from '../../database/db';
import { Album } from '../../types/types';

@Injectable()
export class AlbumService {
  getAlbums(): Album[] {
    return albums;
  }
}
