import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'text' })
  login: string;

  @Column({ type: 'text' })
  password: string;

  @VersionColumn({ type: 'integer' })
  version: number;

  @CreateDateColumn({
    transformer: {
      from(date) {
        return date.getTime();
      },
      to(date) {
        return date;
      },
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    transformer: {
      from(date) {
        return date.getTime();
      },
      to(date) {
        return date;
      },
    },
  })
  updatedAt: number;
}
