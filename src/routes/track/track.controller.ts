import { Controller, Get } from '@nestjs/common';
import { Track } from '../../types/types';
import { TrackService } from 'src/routes/track/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }
}
