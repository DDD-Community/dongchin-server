import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { NicknameRepository } from '../repository/nickname.repository';
import { StorageRepository } from '../repository/storage.repository';
import { ToonRepository } from '../repository/toon.repository';
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

  async createStorage(
    name: string,
    nickName: string,
  ): Promise<CommonResponseDto> {
    return this.storageRepository.createStorage(
      this.nicknameRepository,
      name,
      nickName,
    );
  }
  async getStorage(nickName: string): Promise<CommonResponseDto> {
    return this.storageRepository.getStorage(this.nicknameRepository, nickName);
  }

  async addToonByStorageId(
    storageId: number,
    toonId: number,
  ): Promise<CommonResponseDto> {
    return this.storageRepository.addToonByStorageId(
      this.toonRepository,
      storageId,
      toonId,
    );
  }

  async getToonsByStorageId(id: number): Promise<CommonResponseDto> {
    return this.storageRepository.getToonsByStorageId(id);
  }

  async deleteToonsByStorageId(
    id: number,
    toonsIdDto: ToonsListDto,
  ): Promise<CommonResponseDto> {
    return this.storageRepository.deleteToonsByStorageId(id, toonsIdDto);
  }

  async deleteStorageById(storageId: number): Promise<CommonResponseDto> {
    return this.storageRepository.deleteStorageById(storageId);
  }

  async updateStorageName(
    storageId: number,
    name: string,
  ): Promise<CommonResponseDto> {
    return this.storageRepository.updateStorageName(storageId, name);
  }
}
