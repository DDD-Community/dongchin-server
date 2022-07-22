import { NotFoundException } from '@nestjs/common';
import { Storage } from '../entity/storage.entity';
import { StorageDetailDto } from '../storage/dto/storage-list.dto';
import { ToonsListDto } from '../storage/dto/toon-list.dto';
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
      return Object.assign({
        statusCode: 201,
        ok: true,
        message: '보관함이 생성되었습니다.',
      });
    }
  }

  async getStorageByNickname(
    nicknameRepository: NicknameRepository,
    nickName: string,
  ): Promise<StorageDetailDto[]> {
    const storageDetails: StorageDetailDto[] = [];
    const result = await nicknameRepository
      .createQueryBuilder('nickname')
      .select('nickname.nickName')
      .leftJoinAndSelect('nickname.storages', 'storage')
      .leftJoinAndSelect('storage.toons', 'toon')
      .andWhere('nickname.nickName = :nickname', { nickname: nickName })
      .getOne();

    const length = Object.keys(result.storages).length;

    for (let i = 0; i < length; i++) {
      const toonsLength = Object.keys(result.storages[i].toons).length;
      const storageName = result.storages[i].name;
      const storageId = result.storages[i].storageId;
      const toonImg = toonsLength ? result.storages[i].toons[0].imgUrl : ' ';
      storageDetails.push(
        new StorageDetailDto(storageName, storageId, toonImg, toonsLength),
      );
    }
    //console.log(storageDetails);
    return Object.assign({
      data: storageDetails,
      statusCode: 200,
      ok: true,
      message: '보관함이 조회 성공.',
    });
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
    const toons = storage.toons;
    console.log(toons);
    if (toons.length === 0) {
      storage.toons = [toon];
      await this.save(storage);
      return Object.assign({
        statusCode: 200,
        ok: true,
        message: '보관함에 인스타툰 추가 성공',
      });
    } else {
      toons.push(toon);
      storage.toons = toons;
      await this.save(storage);
      return Object.assign({
        statusCode: 200,
        ok: true,
        message: '보관함에 인스타툰 추가 성공',
      });
    }
  }

  async getToonsByStorageId(id: number) {
    const toons = await this.createQueryBuilder('storage')
      .leftJoinAndSelect('storage.toons', 'toon')
      .leftJoinAndSelect('toon.tag', 'tag')
      .andWhere('storage.storageId = :id', { id: id })
      .getMany();

    if (toons.length == 0)
      throw new NotFoundException('찾을 수 없는 storageId입니다.');
    return Object.assign({
      data: toons,
      statusCode: 200,
      ok: true,
      message: '조회 성공',
    });
  }

  async deleteToonsByStorageId(id: number, toonsIdDto: ToonsListDto) {
    const storage = await this.findOne({ storageId: id });
    const toons = storage.toons;
    const { toonsIdArray } = toonsIdDto;
    if (!storage) throw new NotFoundException('storageId가 존재하지 않습니다.');

    for (let i = 0; i < toonsIdArray.length; i++) {
      for (let j = 0; j < toons.length; j++) {
        if (toonsIdArray[i] === toons[j].id) {
          toons.splice(j, 1);
        }
      }
    }
    storage.toons = toons;
    await this.save(storage);
    return Object.assign({
      statusCode: 200,
      ok: true,
      message: '성공',
    });
  }

  async deleteStorageById(storageId: number) {
    const result = await this.delete({ storageId: storageId });
    if (result.affected === 0) {
      throw new NotFoundException('잘못된 storageId입니다.');
    } else {
      return Object.assign({
        statusCode: 200,
        success: true,
        message: '보관함이 삭제되었습니다.',
      });
    }
  }

  async updateStorageName(storageId: number, name: string) {
    const storage = await this.findOne({ storageId: storageId });
    if (!storage) {
      throw new NotFoundException('잘못된 storageId로 찾을 수 없습니다.');
    } else {
      storage.name = name;
      await this.save(storage);
      return Object.assign({
        statusCode: 200,
        ok: true,
        message: '보관함 이름이 변경되었습니다.',
      });
    }
  }
}
