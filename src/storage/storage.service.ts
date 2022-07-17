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
    const nickname = await this.nicknameRepository.findOne({
      nickName: nickName,
    });
    if (!nickname) {
      throw new NotFoundException('nickname을 찾을 수 없습니다.');
    } else {
      return this.storageRepository.createStorage(name, nickname);
    }
  }
  async getStorageByNickname(nickName: string) {
    const nickname = await this.nicknameRepository.findOne({
      nickName: nickName,
    });
    const storages = await nickname.storages;
    console.log(storages);
    return storages;
  }
}
