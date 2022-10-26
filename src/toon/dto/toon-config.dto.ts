import { ApiProperty } from '@nestjs/swagger';
import { HashTag } from 'src/entity/hashtag.entity';
import { ToonDto } from './toon-create.dto';

export class ToonConfigDto extends ToonDto {
  @ApiProperty({ description: '툰 id' })
  private readonly id?: number;

  @ApiProperty({ description: '생성 일자' })
  private readonly createAt?: Date;

  @ApiProperty({ description: '태그 배열' })
  private readonly tag?: HashTag[];
  constructor(
    id: number,
    authorName: string,
    instagramId: string,
    description: string,
    imgUrl: string,
    instagramUrl: string,
    htmlUrl: string,
    likeCount: number,
    createAt: Date,
    tag: HashTag[],
  ) {
    super(
      authorName,
      instagramId,
      description,
      imgUrl,
      instagramUrl,
      htmlUrl,
      likeCount,
    );
    this.id = id;
    this.createAt = createAt;
    this.tag = tag;
  }
}
