import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AlbumDto } from '../models';

export class CreateAlbumDto implements AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Length(4)
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}
