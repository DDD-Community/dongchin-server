import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToonController } from './toon.controller';
import { ToonRepository } from './toon.repository';
import { ToonService } from './toon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToonRepository]),
  ],
  controllers: [ToonController],
  providers: [ToonService]
})
export class ToonModule {}
