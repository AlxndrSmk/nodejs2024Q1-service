import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TrackDto } from '../models';

export class CreateTrackDto implements TrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
