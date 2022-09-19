import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ToonDto } from './toon-create.dto';

export class ToonDetailDto {
  constructor(toon: ToonDto, isRecommended: boolean) {
    this.authorName = toon.authorName;
    this.description = toon.description;
    this.htmlUrl = toon.htmlUrl;
    this.imgUrl = toon.imgUrl;
    this.instagramId = toon.instagramId;
    this.instagramUrl = toon.instagramUrl;
    this.likeCount = toon.likeCount;
    this.isRecommended = isRecommended;
  }
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
  @IsBoolean()
  isRecommended: boolean;
}
