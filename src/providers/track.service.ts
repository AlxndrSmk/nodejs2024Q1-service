import { Injectable } from '@nestjs/common';
import { tracks } from '../db/db';
import { Track } from 'src/types/types';

@Injectable()
export class TrackService {
  getTracks(): Track[] {
    return tracks;
  }
}