import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToonController } from './toon.controller';
import { ToonService } from './toon.service';
import { Toon } from '../entity/toon.entity';
import { Banner } from '../entity/banner.entity';
import { ToonToBanner } from '../entity/toonToBanner.entity';
import { HashTag } from '../entity/hashtag.entity';
import { ToonRepository } from '../repository/toon.repository';
import { BannerRepository } from '../repository/banner.repository';
import { ToonToBannerRepository } from '../repository/toonToBanner.repository';
import { HashTagRepository } from '../repository/hashtag.repository';
import { Recommended } from '../entity/recommended.entity';
import { BookMark } from '../entity/bookmark.entity';
import { BookMarkRepository } from '../repository/bookmark.repository';
import { RecommnededRepository } from '../repository/recommended.repository';
import { NicknameRepository } from 'src/repository/nickname.repository';
import { StorageRepository } from 'src/repository/storage.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Toon,
      Banner,
      ToonToBanner,
      HashTag,
      Recommended,
      BookMark,
      ToonRepository,
      BannerRepository,
      ToonToBannerRepository,
      HashTagRepository,
      BookMarkRepository,
      RecommnededRepository,
      StorageRepository,
      NicknameRepository,
    ]),
  ],
  controllers: [ToonController],
  providers: [ToonService],
  exports: [ToonService, TypeOrmModule],
})
export class ToonModule {}
