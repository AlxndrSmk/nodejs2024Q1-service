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
import { TrackService } from 'src/routes/track/track.service';
import { Track } from './models';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  addTrack(@Body(ValidationPipe) createTrackDto: CreateTrackDto) {
    return this.trackService.addTrack(createTrackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
