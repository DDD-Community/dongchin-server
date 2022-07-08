import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { HashTag } from './hashtag.entity';
import { ToonToBanner } from './toonToBanner.entity';

@Entity()
@Unique(['instagramUrl']) // url 중복 여부 체크
export class Toon extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key', default: 1 })
  public id: number;

  @Column()
  @ApiProperty({ description: '작가 이름' })
  public authorName: string;

  @Column()
  @ApiProperty({ description: '인스타그램 ID' })
  public instagramId: string;

  @Column()
  @ApiProperty({ description: '설명' })
  public description: string;

  @Column()
  @ApiProperty({ description: '이미지 url' })
  public imgUrl: string;

  @ManyToMany(() => HashTag)
  @JoinTable()
  tag: HashTag[];

  @Column()
  @ApiProperty({ description: '인스타그램 연결 link' })
  public instagramUrl: string;

  @Column({ default: 0 })
  @ApiProperty({ description: '하트/좋아요 수' })
  public likeCount: number;

  @OneToMany(() => ToonToBanner, (toonToBanner) => toonToBanner.toon)
  public toonToBanners!: ToonToBanner[];

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  public createAt: Date;
}
