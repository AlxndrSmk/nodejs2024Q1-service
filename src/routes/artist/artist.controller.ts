import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from 'src/routes/artist/artist.service';
import { Artist } from './models';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  addTAlbum(@Body(ValidationPipe) createArtsitDto: CreateArtistDto) {
    return this.artistService.addArtist(createArtsitDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAlbum(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
