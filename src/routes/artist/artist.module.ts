import { Module } from '@nestjs/common';
import { ArtistController } from 'src/routes/artist/artist.controller';
import { ArtistService } from 'src/routes/artist/artist.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
