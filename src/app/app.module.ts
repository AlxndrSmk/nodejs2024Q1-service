import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../routes/user/user.module';
import { ArtistModule } from '../routes/artist/artist.module';
import { TrackModule } from '../routes/track/track.module';
import { AlbumModule } from '../routes/album/album.module';
import { FavsModule } from '../routes/favs/favs.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule, FavsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
