import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import Database from 'src/database/db.service';

@Injectable()
export class TrackService {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  getTracks(): Track[] {
    return this.database.tracks;
  }

  @UsePipes(new ValidationPipe())
  addTrack(createTrackDto: CreateTrackDto): Track {
    return this.database.addTrack(createTrackDto);
  }

  deleteTrack(id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    const trackIndex = this.database.tracks.findIndex(
      (track: Track) => track.id === id,
    );
    if (trackIndex === -1)
      throw new NotFoundException(`User with ID ${id} not found`);

    this.database.tracks.splice(trackIndex, 1);
    const trackToDelete = this.database.tracks[trackIndex];
    this.database.tracks.splice(trackIndex, 1);

    this.database.tracks.map((track) => {
      if (track.artistId === trackToDelete?.artistId) {
        return { ...track, artistId: null };
      }
      return track;
    });

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
