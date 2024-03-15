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
import { Album } from './models';
import { CreateAlbumDto } from './dto/create-album.dto';
import Database from 'src/database/db.service';
import { Track } from '../track/models';

@Injectable()
export class AlbumService {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  getAlbums(): Album[] {
    return this.database.albums;
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

    this.database.albums.push(newAlbum);
    return newAlbum;
  }

  deleteAlbum(id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    const albumIndex = this.database.albums.findIndex(
      (album: Album) => album.id === id,
    );
    if (albumIndex === -1)
      throw new NotFoundException(`User with ID ${id} not found`);

    this.database.albums.splice(albumIndex, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
