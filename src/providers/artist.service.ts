import { Injectable } from '@nestjs/common';
import { artists } from '../db/db';
import { Artist } from '../types/types';

@Injectable()
export class ArtistService {
  getArtists(): Artist[] {
    return artists;
  }
}
