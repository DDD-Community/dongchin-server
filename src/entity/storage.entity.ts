import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Nickname } from './nickname.entity';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  storageId: number;

  @Column()
  name: string;

  @ManyToOne(() => Nickname, (nickname) => nickname.storages, { lazy: true })
  nickname: Nickname;

  save(nickname: Nickname) {
    this.nickname = nickname;
  }
}
