import { Injectable } from '@nestjs/common';
import { artists } from '../../database/db';
import { Artist } from '../../types/types';

@Injectable()
export class ArtistService {
  getArtists(): Artist[] {
    return artists;
  }
}
