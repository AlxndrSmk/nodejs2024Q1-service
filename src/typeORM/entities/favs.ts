import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import ArtistEntity from './artist';
import AlbumEntity from './album';
import TrackEntity from './track';

abstract class FavsEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
}

@Entity()
export class FavsArtistsEntity extends FavsEntity {
  @Column({ type: 'uuid', name: 'artist_ID' })
  artistId: string;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artist_ID', referencedColumnName: 'id' })
  artist: ArtistEntity;
}

@Entity()
export class FavsAlbumsEntity extends FavsEntity {
  @Column({ type: 'uuid', name: 'album_ID' })
  albumId: string;

  @ManyToOne(() => AlbumEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'album_ID', referencedColumnName: 'id' })
  album: AlbumEntity;
}

@Entity()
export class FavsTracksEntity extends FavsEntity {
  @Column({ type: 'uuid', name: 'track_ID' })
  trackId: string;

  @ManyToOne(() => TrackEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'track_ID', referencedColumnName: 'id' })
  track: TrackEntity;
}
