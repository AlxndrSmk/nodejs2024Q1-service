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
import { artists } from '../../database/db';
import { Artist } from './models';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  getArtists(): Artist[] {
    return artists;
  }

  @UsePipes(new ValidationPipe())
  addArtist(createArtistDto: CreateArtistDto): Artist {
    const { name, grammy } = createArtistDto;

    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };

    artists.push(newArtist);
    return newArtist;
  }

  deleteArtist(id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    const albumIndex = artists.findIndex((artist: Artist) => artist.id === id);
    if (albumIndex === -1)
      throw new NotFoundException(`User with ID ${id} not found`);

    artists.splice(albumIndex, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
