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

  @ManyToOne(() => Nickname, (nickname) => nickname.storages, { lazy: true })
  nickname: Nickname;

  @ManyToMany(() => Toon, { lazy: true })
  @JoinTable()
  toons: Promise<Toon[]>;

  save(nickname: Nickname) {
    this.nickname = nickname;
  }
}
