import { Controller, Get } from '@nestjs/common';
import { Artist } from '../types/types';
import { ArtistService } from 'src/providers/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }
}
