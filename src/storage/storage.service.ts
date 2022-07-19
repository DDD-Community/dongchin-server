import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NicknameRepository } from 'src/repository/nickname.repository';
import { StorageRepository } from 'src/repository/storage.repository';
import { ToonRepository } from 'src/repository/toon.repository';
import { ToonsListDto } from './dto/toon-list.dto';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageRepository)
    private storageRepository: StorageRepository,

    @InjectRepository(NicknameRepository)
    private nicknameRepository: NicknameRepository,

    @InjectRepository(ToonRepository)
    private toonRepository: ToonRepository,
  ) {}

  async createStorage(name: string, nickName: string) {
    return this.storageRepository.createStorage(
      this.nicknameRepository,
      name,
      nickName,
    );
  }
  async getStorageByNickname(nickName: string) {
    return this.storageRepository.getStorageByNickname(
      this.nicknameRepository,
      nickName,
    );
  }

  async addToonByStorageId(storageId: number, toonId: number) {
    return this.storageRepository.addToonByStorageId(
      this.toonRepository,
      storageId,
      toonId,
    );
  }

  async getToonsByStorageId(id: number) {
    return this.storageRepository.getToonsByStorageId(id);
  }

  async deleteToonsByStorageId(id: number, toonsIdDto: ToonsListDto) {
    return this.storageRepository.deleteToonsByStorageId(id, toonsIdDto);
  }

  async deleteStorageById(storageId: number) {
    return this.storageRepository.deleteStorageById(storageId);
  }
}
