import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToonRepository } from '../repository/toon.repository';
import { BannerController } from './banner.controller';
import { BannerRepository } from '../repository/banner.repository';
import { BannerService } from './banner.service';
import { ToonToBannerRepository } from '../repository/toonToBanner.repository';
import { ToonService } from 'src/toon/toon.service';
import { ToonModule } from 'src/toon/toon.module';

@Module({
  imports: [
    // import ToonRepository
    TypeOrmModule.forFeature([
      BannerRepository,
      ToonRepository,
      ToonToBannerRepository,
    ]),
    ToonModule,
  ],
  controllers: [BannerController],
  providers: [BannerService, ToonService],
})
export class BannerModule {}
