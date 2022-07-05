import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['title']) // 태그 이름 중복 체크
export class HashTag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '태그 id', default: 1 })
  public id: number;

  @Column()
  @ApiProperty({ description: '태그 이름', default: '일상' })
  public title: string;

  @Column({ default: 0 })
  @ApiProperty({ description: '검색 횟수 count', default: 0 })
  public count: number;

  @Column()
  @ApiProperty({ description: '주제 태그 or 그림체 태그' })
  public category: string;
}
