import { Module } from '@nestjs/common';
import { AlbumController } from 'src/routes/album/album.controller';
import { AlbumService } from 'src/routes/album/album.service';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
