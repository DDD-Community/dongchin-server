import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NicknameRepository } from 'src/repository/nickname.repository';
import { StorageRepository } from 'src/repository/storage.repository';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageRepository)
    private storageRepository: StorageRepository,

    @InjectRepository(NicknameRepository)
    private nicknameRepository: NicknameRepository,
  ) {}

  async createStorage(name: string, nickName: string) {
    const user = await this.nicknameRepository.find({ nickName: nickName });
    if (user.length === 0) {
      console.log('hi');
      throw new NotFoundException('nickname을 찾을 수 없습니다.');
    } else {
      return user;
    }
  }
}
