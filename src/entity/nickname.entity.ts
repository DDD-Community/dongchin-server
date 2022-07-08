import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['nickName']) // 닉네임 중복 여부 체크
export class Nickname extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id값', default: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: '닉네임', default: 'yong' })
  nickName: string;
}
