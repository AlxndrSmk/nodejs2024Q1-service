import { Album } from 'src/routes/album/models';
import { Artist } from 'src/routes/artist/models';
import { Track } from 'src/routes/track/models';
import { User } from 'src/routes/user/models';
import { Favorites } from 'src/types/types';

export const users: User[] = [];
export const artists: Artist[] = [];
export const tracks: Track[] = [];
export const albums: Album[] = [];
export const favs: Favorites[] = [];
