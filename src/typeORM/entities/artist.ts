import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;
}
