import { Module } from '@nestjs/common';
import { ArtistController } from 'src/controllers/artist.controller';
import { ArtistService } from 'src/providers/artist.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
