import { Module } from '@nestjs/common';
import { AlbumController } from 'src/controllers/album.controller';
import { AlbumService } from 'src/providers/album.service';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
