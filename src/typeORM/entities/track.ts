import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import AlbumEntity from './album';
import ArtistEntity from './artist';

@Entity()
export default class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true, name: 'artist_ID', default: null })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'artist_ID', referencedColumnName: 'id' })
  artist: ArtistEntity;

  @Column({ type: 'text', nullable: true, name: 'album_ID', default: null })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, {
    onDelete: 'SET NULL',
    cascade: true,
  })
  @JoinColumn({ name: 'album_ID', referencedColumnName: 'id' })
  album: AlbumEntity;

  @Column({ type: 'float' })
  duration: number;
}
