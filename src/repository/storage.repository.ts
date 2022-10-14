import { NotFoundException } from '@nestjs/common';
import { Storage } from '../entity/storage.entity';
import { StorageDetailDto } from '../storage/dto/storage-list.dto';
import { ToonsListDto } from '../storage/dto/toon-list.dto';
import { EntityRepository, Repository } from 'typeorm';
import { NicknameRepository } from './nickname.repository';
import { ToonRepository } from './toon.repository';
import { CommonResponseDto } from 'src/api/common-response.dto';

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {
  private response: CommonResponseDto;
  async createStorage(
    nicknameRepository: NicknameRepository,
    name: string,
    nickName: string,
  ): Promise<CommonResponseDto> {
    const nickname = await nicknameRepository.findOne({
      nickName: nickName,
    });
    if (!nickname) {
      throw new NotFoundException('nickname을 찾을 수 없습니다.');
    } else {
      const storage = this.create({ name: name });
      storage.save(nickname);
      await this.save(storage);
      this.response = new CommonResponseDto(
        201,
        true,
        '보관함이 생성되었습니다.',
      );
      return this.response;
    }
  }

  async getStorage(
    nicknameRepository: NicknameRepository,
    nickName: string,
  ): Promise<CommonResponseDto> {
    const storageDetails: StorageDetailDto[] = [];
    const result = await this.getStorageBynickname(
      nicknameRepository,
      nickName,
    );

    for (let i = 0; i < Object.keys(result.storages).length; i++) {
      const toonsLength = Object.keys(result.storages[i].toons).length;
      const storageName = result.storages[i].name;
      const storageId = result.storages[i].storageId;
      const toonImg = toonsLength ? result.storages[i].toons[0].imgUrl : ' ';
      storageDetails.push(
        new StorageDetailDto(storageName, storageId, toonImg, toonsLength),
      );
    }
    this.response = new CommonResponseDto(
      200,
      true,
      '보관함 조회 성공',
      storageDetails,
    );
    return this.response;
  }

  async addToonByStorageId(
    toonRepository: ToonRepository,
    storageId: number,
    toonId: number,
  ): Promise<CommonResponseDto> {
    const storage = await this.findOne({ storageId: storageId });
    const toon = await toonRepository.findOne({ id: toonId });

    if (!storage || !toon) {
      throw new NotFoundException('Id를 찾을 수 없습니다.');
    }
    const toons = storage.toons;
    this.response = new CommonResponseDto(
      200,
      true,
      '보관함에 인스타툰 추가 성공',
    );
    if (toons.length === 0) {
      storage.toons = [toon];
      await this.save(storage);
    } else {
      toons.push(toon);
      storage.toons = toons;
      await this.save(storage);
    }
    return this.response;
  }

  async getToonsByStorageId(id: number): Promise<CommonResponseDto> {
    const toons = await this.createQueryBuilder('storage')
      .leftJoinAndSelect('storage.toons', 'toon')
      .leftJoinAndSelect('toon.tag', 'tag')
      .andWhere('storage.storageId = :id', { id: id })
      .getMany();

    if (toons.length == 0)
      throw new NotFoundException('찾을 수 없는 storageId입니다.');
    this.response = new CommonResponseDto(200, true, '조회 성공', toons);
    return this.response;
  }

  async deleteToonsByStorageId(
    id: number,
    toonsIdDto: ToonsListDto,
  ): Promise<CommonResponseDto> {
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
    this.response = new CommonResponseDto(200, true, '성공');
    return this.response;
  }

  async deleteStorageById(storageId: number): Promise<CommonResponseDto> {
    const result = await this.delete({ storageId: storageId });
    if (result.affected === 0) {
      throw new NotFoundException('잘못된 storageId입니다.');
    } else {
      this.response = new CommonResponseDto(
        200,
        true,
        '보관함이 삭제되었습니다.',
      );
      return this.response;
    }
  }

  async updateStorageName(
    storageId: number,
    name: string,
  ): Promise<CommonResponseDto> {
    const storage = await this.findOne({ storageId: storageId });
    if (!storage) {
      throw new NotFoundException('잘못된 storageId로 찾을 수 없습니다.');
    } else {
      storage.name = name;
      await this.save(storage);
      this.response = new CommonResponseDto(
        200,
        true,
        '보관함 이름이 변경되었습니다.',
      );
      return this.response;
    }
  }

  getStorageBynickname(
    nicknameRepository: NicknameRepository,
    nickname: string,
  ) {
    const result = nicknameRepository
      .createQueryBuilder('nickname')
      .select('nickname.nickName')
      .leftJoinAndSelect('nickname.storages', 'storage')
      .leftJoinAndSelect('storage.toons', 'toon')
      .andWhere('nickname.nickName = :nickname', { nickname: nickname })
      .getOne();
    return result;
  }
}
