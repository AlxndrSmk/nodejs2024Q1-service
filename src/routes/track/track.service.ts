import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { tracks } from '../../database/db';
import { Track } from './models';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  getTracks(): Track[] {
    return tracks;
  }

  @UsePipes(new ValidationPipe())
  addTrack(createTrackDto: CreateTrackDto): Track {
    const { name, artistId, albumId, duration } = createTrackDto;

    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId,
      albumId,
      duration,
    };

    tracks.push(newTrack);
    return newTrack;
  }

  deleteTrack(id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    const trackIndex = tracks.findIndex((track: Track) => track.id === id);
    if (trackIndex === -1)
      throw new NotFoundException(`User with ID ${id} not found`);

    tracks.splice(trackIndex, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
