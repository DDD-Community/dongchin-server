import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTag } from '../entity/hashtag.entity';
import { Toon } from '../entity/toon.entity';
import { HashTagRepository } from '../repository/hashtag.repository';
import { ToonRepository } from '../repository/toon.repository';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HashTag,
      Toon,
      HashTagRepository,
      ToonRepository,
    ]),
  ],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
