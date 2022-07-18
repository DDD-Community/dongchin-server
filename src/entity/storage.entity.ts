import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Nickname } from './nickname.entity';
import { Toon } from './toon.entity';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  storageId: number;

  @Column()
  name: string;

  @ManyToOne(() => Nickname, (nickname) => nickname.storages)
  nickname: Nickname;

  @ManyToMany(() => Toon, { eager: true })
  @JoinTable()
  toons: Toon[];

  save(nickname: Nickname) {
    this.nickname = nickname;
  }
}
