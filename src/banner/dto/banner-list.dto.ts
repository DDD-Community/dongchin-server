import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ToonConfig } from 'src/toon/config/type.config';
import { ToonConfigDto } from 'src/toon/dto/toon-config.dto';

export class BannerListDto {
  @ApiProperty({ description: '배너 ID' })
  @IsNumber()
  private readonly id: number;

  @ApiProperty({ description: '배너 이름' })
  @IsString()
  private readonly name: string;

  @IsString()
  @ApiProperty({ description: '배너 이미지 url' })
  private readonly bannerUrl: string;

  @IsArray()
  @ApiProperty({ description: '해당 배너 툰 list', type: ToonConfigDto })
  private toons: Array<ToonConfigDto>;

  constructor(id: number, name: string, bannerUrl: string) {
    this.id = id;
    this.name = name;
    this.bannerUrl = bannerUrl;
    this.toons = [];
  }

  addToons(toons: Array<ToonConfig> = []) {
    toons.forEach((toon) => {
      this.toons.push(
        new ToonConfigDto(
          toon.id,
          toon.authorName,
          toon.instagramId,
          toon.description,
          toon.imgUrl,
          toon.instagramUrl,
          toon.htmlUrl,
          toon.likeCount,
          toon.createAt,
          toon.tag,
        ),
      );
    });
  }

  getToons() {
    return this.toons;
  }

  getInfo() {
    return { name: this.name, bannerUrl: this.bannerUrl, id: this.id };
  }
}
