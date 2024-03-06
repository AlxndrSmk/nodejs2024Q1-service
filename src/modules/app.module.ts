import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../providers/app.service';
import { UserModule } from './user.module';
import { ArtistModule } from './artist.module';
import { TrackModule } from './track.module';
import { AlbumModule } from './album.module';
import { FavsModule } from './favs.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule, FavsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
