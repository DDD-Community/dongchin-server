import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from '../entity/storage.entity';
import { NicknameRepository } from '../repository/nickname.repository';
import { StorageRepository } from '../repository/storage.repository';
import { ToonRepository } from '../repository/toon.repository';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Storage,
      StorageRepository,
      NicknameRepository,
      ToonRepository,
    ]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
