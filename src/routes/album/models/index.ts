export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface AlbumDto {
  name: string;
  year: number;
}
