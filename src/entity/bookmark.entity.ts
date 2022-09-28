import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookMark {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '북마크 Entity id', default: 1 })
  public id: number;

  @Column()
  @ApiProperty({ description: '닉네임', default: 'taeyong' })
  public nickName: string;

  @Column()
  @ApiProperty({ description: '인스타툰 id', default: 9 })
  public toonId: number;
}
