import { Module } from '@nestjs/common';
import { TrackController } from 'src/routes/track/track.controller';
import { TrackService } from 'src/routes/track/track.service';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
