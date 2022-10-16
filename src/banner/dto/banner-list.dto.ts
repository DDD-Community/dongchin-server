import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { BannerToon } from './banner.dto';

export class BannerListDto {
  @ApiProperty({ description: '배너 이름' })
  @IsString()
  private readonly name: string;

  @IsString()
  @ApiProperty({ description: '배너 이미지 url' })
  private readonly bannerUrl: string;

  @IsArray()
  @ApiProperty({ description: '해당 배너 툰 list' })
  private readonly toons: Array<BannerToon>;

  constructor(name: string, bannerUrl: string) {
    this.name = name;
    this.bannerUrl = bannerUrl;
    this.toons = [];
  }

  addToons(toons: BannerToon) {
    this.toons.push(toons);
  }

  getToons() {
    return this.toons;
  }
}
