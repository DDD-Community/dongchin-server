import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ToonToBanner } from './toonToBanner.entity';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '배너 id', default: 1 })
  public id: number;

  @Column()
  @ApiProperty({ description: '배너 이름', default: '커스텀 배너' })
  public name: string;

  @OneToMany(() => ToonToBanner, (toonToBanner) => toonToBanner.banner)
  public toonToBanners!: ToonToBanner[];
}
