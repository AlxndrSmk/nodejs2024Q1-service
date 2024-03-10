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
import { albums } from '../../database/db';
import { Album } from './models';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  getAlbums(): Album[] {
    return albums;
  }

  @UsePipes(new ValidationPipe())
  addAlbum(createAlbumDto: CreateAlbumDto): Album {
    const { name, artistId, year } = createAlbumDto;

    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };

    albums.push(newAlbum);
    return newAlbum;
  }

  deleteAlbum(id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    const albumIndex = albums.findIndex((album: Album) => album.id === id);
    if (albumIndex === -1)
      throw new NotFoundException(`User with ID ${id} not found`);

    albums.splice(albumIndex, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
