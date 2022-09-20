import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class ToonDetailDto {
  constructor(toon: any, isRecommended: boolean) {
    this.id = toon.id;
    this.authorName = toon.authorName;
    this.description = toon.description;
    this.htmlUrl = toon.htmlUrl;
    this.imgUrl = toon.imgUrl;
    this.instagramId = toon.instagramId;
    this.instagramUrl = toon.instagramUrl;
    this.likeCount = toon.likeCount;
    this.createAt = toon.createAt;
    this.tag = toon.tag;
    this.isRecommended = isRecommended;
  }
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  authorName: string; //작가 이름

  @ApiProperty()
  @IsString()
  instagramId: string; //인스타그램 ID

  @ApiProperty()
  @IsString()
  description: string; //설명

  @ApiProperty()
  @IsString()
  imgUrl: string; //이미지 url

  @ApiProperty()
  @IsString()
  instagramUrl: string; // instagram연결 link

  @ApiProperty()
  @IsString()
  htmlUrl: string;

  @ApiProperty()
  @IsNumber()
  likeCount: number; // 좋아요 수

  @ApiProperty()
  @IsNumber()
  createAt: string;

  @ApiProperty()
  @IsArray()
  tag: [];

  @ApiProperty()
  @IsBoolean()
  isRecommended: boolean;
}
