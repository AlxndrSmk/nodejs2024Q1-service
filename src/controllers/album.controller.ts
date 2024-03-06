import { Controller, Get } from '@nestjs/common';
import { AlbumService } from 'src/providers/album.service';
import { Album } from 'src/types/types';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getUsers(): Album[] {
    return this.albumService.getAlbums();
  }
}
