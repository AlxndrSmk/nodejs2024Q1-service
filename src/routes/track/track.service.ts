import { Injectable } from '@nestjs/common';
import { tracks } from '../../database/db';
import { Track } from 'src/types/types';

@Injectable()
export class TrackService {
  getTracks(): Track[] {
    return tracks;
  }
}
