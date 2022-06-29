import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTagRepository } from 'src/repository/hashtag.repository';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HashTagRepository])
  ],
  controllers: [HashtagController],
  providers: [HashtagService]
})
export class HashtagModule {}
