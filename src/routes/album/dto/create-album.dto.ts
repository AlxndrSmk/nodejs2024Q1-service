import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AlbumDto } from '../models';

export class CreateAlbumDto implements AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}
