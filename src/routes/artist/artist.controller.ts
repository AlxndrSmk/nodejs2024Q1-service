import { Controller, Get } from '@nestjs/common';
import { Artist } from '../../types/types';
import { ArtistService } from 'src/routes/artist/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }
}
