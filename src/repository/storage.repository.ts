import { NotFoundException } from '@nestjs/common';
import { Nickname } from 'src/entity/nickname.entity';
import { Storage } from 'src/entity/storage.entity';
import { EntityRepository, Repository } from 'typeorm';
import { NicknameRepository } from './nickname.repository';
import { ToonRepository } from './toon.repository';

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {
  async createStorage(
    nicknameRepository: NicknameRepository,
    name: string,
    nickName: string,
  ) {
    const nickname = await nicknameRepository.findOne({
      nickName: nickName,
    });
    if (!nickname) {
      throw new NotFoundException('nickname을 찾을 수 없습니다.');
    } else {
      const storage = this.create({ name: name });
      storage.save(nickname);
      await this.save(storage);
    }
  }

  async getStorageByNickname(
    nicknameRepository: NicknameRepository,
    nickName: string,
  ) {
    const nickname = await nicknameRepository.findOne({
      nickName: nickName,
    });
    if (!nickname) {
      throw new NotFoundException('nickname을 찾을 수 없습니다.');
    }
    const storages = await nickname.storages;
    console.log(storages);
    return storages;
  }

  async addToonByStorageId(
    toonRepository: ToonRepository,
    storageId: number,
    toonId: number,
  ) {
    const storage = await this.findOne({ storageId: storageId });
    const toon = await toonRepository.findOne({ id: toonId });

    if (!storage || !toon) {
      throw new NotFoundException('Id를 찾을 수 없습니다.');
    }
    const toons = await storage.toons;
    console.log(toons);
    if (toons.length === 0) {
      storage.toons = Promise.resolve([toon]);
      await this.save(storage);
    } else {
      toons.push(toon);
      storage.toons = Promise.resolve(toons);
    }
  }
}
