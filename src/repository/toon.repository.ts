import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ToonDto } from '../toon/dto/toon-create.dto';
import { Toon } from '../entity/toon.entity';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { RecommnededRepository } from './recommended.repository';
import {
  GetToonDetailConfig,
  RecommendConfig,
  ToonConfig,
  ToonDetailConfig,
  ToonFindAllOptions,
} from 'src/toon/config/type.config';
import { Nickname } from 'src/entity/nickname.entity';

@EntityRepository(Toon)
export class ToonRepository extends Repository<Toon> {
  private response: CommonResponseDto;

  async createToon(toonDto: ToonDto): Promise<any> {
    const instaToon = this.create(toonDto);

    try {
      const result = await this.save(instaToon); // 인스타툰 링크/name 저장
      return Object.assign({
        data: result,
        statusCode: 201,
        ok: true,
        message: '인스타툰이 등록되었습니다.',
      });
    } catch (error) {
      if (error.code === '23502') {
        throw new BadRequestException('column 에 추가적인 값이 필요합니다.');
      }
      throw new BadRequestException(
        Object.assign({
          statusCode: 400,
          ok: false,
          message: 'url이 중복됩니다.',
        }),
      );
    }
  }

  async getAllToons() {
    const query = this.createQueryBuilder('toon');
    const toons = await query.leftJoinAndSelect('toon.tag', 'tag').getMany();
    return Object.assign({
      data: toons,
      statusCode: 200,
      ok: true,
      message: '인스타툰 전체 리스트입니다.',
    });
  }

  async getToonDetailById(
    getToonDetail: GetToonDetailConfig,
  ): Promise<CommonResponseDto> {
    const {
      nickName,
      toonId,
      recommendedRepository,
      nicknameRepository,
      storageRepository,
    } = getToonDetail;
    const query = this.createQueryBuilder('toon');
    const toon: ToonConfig = await query
      .leftJoinAndSelect('toon.tag', 'tag')
      .where('toon.id = :id', { id: toonId })
      .getOne();
    if (!toon) {
      throw new NotFoundException('존재하지 않는 id입니다.');
    } else {
      const recommend = await recommendedRepository.getRecommended(
        nickName,
        toonId,
      );
      const nickname: Nickname = await storageRepository.getStorageBynickname(
        nicknameRepository,
        nickName,
      );
      const storageIds: number[] = this.findStorageIds(nickname, toonId);

      const toonDetail: ToonDetailConfig = {
        id: toon.id,
        authorName: toon.authorName,
        instagramId: toon.instagramId,
        description: toon.description,
        imgUrl: toon.imgUrl,
        instagramUrl: toon.instagramUrl,
        htmlUrl: toon.htmlUrl,
        likeCount: toon.likeCount,
        createAt: toon.createAt,
        tag: toon.tag,
        isRecommended: true,
        storageIds: storageIds,
      };
      if (recommend) {
        toonDetail.isRecommended = true;
      } else {
        toonDetail.isRecommended = false;
      }
      this.response = new CommonResponseDto(200, true, '성공', [toonDetail]);
      return this.response;
    }
  }

  async getToonById(ids: Array<number> = []): Promise<ToonConfig[]> {
    const query = this.createQueryBuilder('toon');
    try {
      const toons: ToonConfig[] = await query
        .leftJoinAndSelect('toon.tag', 'tag')
        .where('toon.id IN (:...ids)', { ids: ids })
        .getMany();
      return toons;
    } catch (error) {
      throw new BadRequestException('잘못된 id입니다.');
    }
  }

  async getRecentToons(): Promise<CommonResponseDto> {
    const toons = await this.createQueryBuilder('toon')
      .leftJoinAndSelect('toon.tag', 'tag')
      .orderBy('toon.createAt', 'DESC')
      .take(2)
      .getMany();

    if (!toons) {
      this.response = new CommonResponseDto(
        404,
        false,
        '등록된 툰이 없습니다.',
      );
    } else {
      this.response = new CommonResponseDto(
        200,
        true,
        '최근 등록된 인스타툰 목록',
        toons,
      );
    }
    return this.response;
  }

  async getRandomToons(): Promise<CommonResponseDto> {
    const toons = await this.createQueryBuilder('toon')
      .leftJoinAndSelect('toon.tag', 'tag')
      .getMany();
    const randomToons = toons.sort(() => Math.random() - 0.5).splice(0, 4); // 랜덤 정렬 후 4개 자르기
    this.response = new CommonResponseDto(
      200,
      true,
      '추천 API 성공',
      randomToons,
    );
    return this.response;
  }

  async getPopularList(): Promise<CommonResponseDto> {
    const toons: ToonConfig[] = await this.createQueryBuilder('toon')
      .leftJoinAndSelect('toon.tag', 'tag')
      .orderBy('toon.likeCount', 'DESC')
      .take(6)
      .getMany();
    this.response = new CommonResponseDto(200, true, '조회 성공', toons);
    return this.response;
  }

  async patchRecommended(
    recommendConfig: RecommendConfig,
    recommendedRepository: RecommnededRepository,
  ) {
    const { nickName, toonId, key } = recommendConfig;
    let result: boolean;
    try {
      if (key) {
        result = await recommendedRepository.addRecommended(nickName, toonId);
      } else {
        result = await recommendedRepository.deleteRecommended(
          nickName,
          toonId,
        );
      }
      if (result) {
        this.response = new CommonResponseDto(
          200,
          true,
          '좋아요 및 북마크 추가',
        );
      } else {
        this.response = new CommonResponseDto(
          200,
          false,
          '좋아요 및 북마크 취소',
        );
      }
    } catch (error) {
      Logger.verbose('error', error);
    }
    return this.response;
  }

  async findAll(options: ToonFindAllOptions = {}): Promise<CommonResponseDto> {
    const { input, tagIds } = options;
    const length = tagIds.length;
    const queryBuilder = this.createQueryBuilder('toon').leftJoinAndSelect(
      'toon.tag',
      'tag',
    );
    try {
      if (input === ' ' && length === 0) {
        this.response = new CommonResponseDto(200, true, '조회 성공');
      } else {
        if (length > 0) {
          const result = await queryBuilder.getMany();
          const filters = result.filter((toon) => {
            let isExist = false;
            tagIds.forEach((id) => {
              toon.tag.forEach((tag) => {
                Logger.verbose('id 및 toon의 tag id', id, tag.id);
                if (id === tag.id) isExist = true;
              });
            });
            if (isExist) return true;
          });
          Logger.verbose('검색 태그 길이 및 필터링된 인스타툰', filters);
          if (input === ' ') {
            this.response = new CommonResponseDto(
              200,
              true,
              '검색 성공',
              filters,
            );
          } else {
            this.response = this.filterTopic(filters, input);
          }
        } else {
          const result = await queryBuilder.getMany();
          this.response = this.filterTopic(result, input);
        }
        return this.response;
      }
    } catch (error) {
      Logger.verbose('검색 에러', error);
    }
  }
  filterTopic(toons: any, input: any) {
    const result = [];
    for (let i = 0; i < toons.length; i++) {
      for (let j = 0; j < toons[i].tag.length; j++) {
        if (
          toons[i].tag[j].category == 'subject' &&
          toons[i].tag[j].title.includes(input)
        ) {
          result.push(toons[i]);
        }
      }
    }
    return new CommonResponseDto(200, true, '검색 성공', result);
  }
  findStorageIds(nickname: Nickname, toonId: number) {
    const storageIds: number[] = [];

    for (let i = 0; i < Object.keys(nickname.storages).length; i++) {
      const length = Object.keys(nickname.storages[i].toons).length;
      for (let j = 0; j < length; j++) {
        if (nickname.storages[i].toons[j].id === toonId) {
          const storageId = nickname.storages[i].storageId;
          storageIds.push(storageId);
        }
      }
    }
    return storageIds;
  }

  async getToonsWithBanner() {
    return await this.createQueryBuilder('toon')
      .leftJoinAndSelect('toon.toonToBanners', 'toonToBanners')
      .getRawMany();
  }
}
