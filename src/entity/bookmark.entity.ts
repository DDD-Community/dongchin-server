import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookMark {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '북마크 Entity id', default: 1 })
  public id: number;

  @Column()
  @ApiProperty({ description: '유저 id', default: 3 })
  public userId: number;

  @Column()
  @ApiProperty({ description: '인스타툰 id', default: 9 })
  public toonId: number;
}
