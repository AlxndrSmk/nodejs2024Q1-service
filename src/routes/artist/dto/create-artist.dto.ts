import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ArtistDto } from '../models';

export class CreateArtistDto implements ArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
