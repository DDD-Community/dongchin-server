import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class BannerToon {
  @ApiProperty({ description: '인스타툰 이미지 url' })
  @IsString()
  private imgUrl: string;

  @ApiProperty({ description: '인스타툰 id' })
  @IsNumber()
  private id: number;

  @ApiProperty({ description: '인스타툰 tagIds' })
  @IsArray()
  private tagIds: Array<number>;

  constructor(imgUrl: string, id: number, tagIds: Array<number>) {
    this.imgUrl = imgUrl;
    this.id = id;
    this.tagIds = tagIds;
  }
}
