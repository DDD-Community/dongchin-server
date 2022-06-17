import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToonRepository } from 'src/toon/toon.repository';
import { BannerController } from './banner.controller';
import { BannerRepository } from './banner.repository';
import { BannerService } from './banner.service';

@Module({
  imports: [// import ToonRepository
    TypeOrmModule.forFeature([BannerRepository, ToonRepository])
  ],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule {}
