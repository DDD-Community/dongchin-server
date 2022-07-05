import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTagRepository } from 'src/repository/hashtag.repository';
import { ToonRepository } from 'src/repository/toon.repository';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [TypeOrmModule.forFeature([HashTagRepository, ToonRepository])],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
