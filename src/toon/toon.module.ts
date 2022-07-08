import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToonController } from './toon.controller';
import { ToonService } from './toon.service';
import { Toon } from 'src/entity/toon.entity';
import { Banner } from 'src/entity/banner.entity';
import { ToonToBanner } from 'src/entity/toonToBanner.entity';
import { HashTag } from 'src/entity/hashtag.entity';
import { ToonRepository } from 'src/repository/toon.repository';
import { BannerRepository } from 'src/repository/banner.repository';
import { ToonToBannerRepository } from 'src/repository/toonToBanner.repository';
import { HashTagRepository } from 'src/repository/hashtag.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Toon,
      Banner,
      ToonToBanner,
      HashTag,
      ToonRepository,
      BannerRepository,
      ToonToBannerRepository,
      HashTagRepository,
    ]),
  ],
  controllers: [ToonController],
  providers: [ToonService],
})
export class ToonModule {}
