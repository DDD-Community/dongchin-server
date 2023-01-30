import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ToonDto {
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

  constructor(
    authorName: string,
    instagramId: string,
    description: string,
    imgUrl: string,
    instagramUrl: string,
    htmlUrl: string,
    likeCount: number,
  ) {
    (this.authorName = authorName),
      (this.instagramId = instagramId),
      (this.description = description),
      (this.imgUrl = imgUrl),
      (this.instagramUrl = instagramUrl),
      (this.htmlUrl = htmlUrl),
      (this.likeCount = likeCount);
  }
}
