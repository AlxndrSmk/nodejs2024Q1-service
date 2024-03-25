export interface Track {
  id: string;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface TrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
