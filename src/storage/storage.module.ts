import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from 'src/entity/storage.entity';
import { NicknameRepository } from 'src/repository/nickname.repository';
import { StorageRepository } from 'src/repository/storage.repository';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Storage, StorageRepository, NicknameRepository]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
