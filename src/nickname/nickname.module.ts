import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NicknameController } from './nickname.controller';
import { NicknameService } from './nickname.service';
import { Nickname } from '../entity/nickname.entity';
import { NicknameRepository } from 'src/repository/nickname.repository';
import { Storage } from '../entity/storage.entity';
import { StorageRepository } from 'src/repository/storage.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nickname, NicknameRepository, StorageRepository]),
  ],
  controllers: [NicknameController],
  providers: [NicknameService],
})
export class NicknameModule {}
