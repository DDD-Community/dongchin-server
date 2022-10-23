import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { ToonConfig } from 'src/toon/config/type.config';

export class BannerListDto {
  @ApiProperty({ description: '배너 이름' })
  @IsString()
  private readonly name: string;

  @IsString()
  @ApiProperty({ description: '배너 이미지 url' })
  private readonly bannerUrl: string;

  @IsArray()
  @ApiProperty({ description: '해당 배너 툰 list' })
  private toons: Array<ToonConfig>;

  constructor(name: string, bannerUrl: string) {
    this.name = name;
    this.bannerUrl = bannerUrl;
    this.toons = [];
  }

  addToons(toons: Array<ToonConfig> = []) {
    this.toons = toons;
  }

  getToons() {
    return this.toons;
  }
}
