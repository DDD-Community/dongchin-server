import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerRepository } from 'src/repository/banner.repository';
import { ToonController } from './toon.controller';
import { ToonRepository } from '../repository/toon.repository';
import { ToonService } from './toon.service';
import { ToonToBannerRepository } from 'src/repository/toonToBanner.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToonRepository, BannerRepository, ToonToBannerRepository]),
  ],
  controllers: [ToonController],
  providers: [ToonService]
})
export class ToonModule {}