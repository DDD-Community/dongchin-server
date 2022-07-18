import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Storage } from './storage.entity';

@Entity()
@Unique(['nickName']) // 닉네임 중복 여부 체크
export class Nickname {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id값', default: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: '닉네임', default: 'yong' })
  nickName: string;

  @OneToMany(() => Storage, (storage) => storage.nickname, {
    onDelete: 'CASCADE',
  })
  storages: Storage;
}
