import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config.js';
import UserEntity from './entities/user';
import AlbumEntity from './entities/album';
import ArtistEntity from './entities/artist';
import TrackEntity from './entities/track';
import {
  FavsAlbumsEntity,
  FavsArtistsEntity,
  FavsTracksEntity,
} from './entities/favs';

const postgreConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  // host: '0.0.0.0',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    UserEntity,
    AlbumEntity,
    ArtistEntity,
    TrackEntity,
    FavsArtistsEntity,
    FavsAlbumsEntity,
    FavsTracksEntity,
  ],
  synchronize: true,
  keepConnectionAlive: true,
  migrations: [
    './entities/user.ts',
    './entities/album.ts',
    './entities/artist.ts',
    './entities/track.ts',
    './entities/favs.ts',
  ],
  migrationsTableName: process.env.POSTGRES_DB,
  logger: 'debug',
};

export default postgreConfig;
