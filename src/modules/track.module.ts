import { Module } from '@nestjs/common';
import { TrackController } from 'src/controllers/track.controller';
import { TrackService } from 'src/providers/track.service';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
