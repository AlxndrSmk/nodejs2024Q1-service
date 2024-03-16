import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import ArtistEntity from './artist';

@Entity()
export default class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'text', name: 'artist_ID', nullable: true, default: null })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artist_ID', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
