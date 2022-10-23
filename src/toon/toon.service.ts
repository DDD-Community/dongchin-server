import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerRepository } from '../repository/banner.repository';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonRepository } from '../repository/toon.repository';
import { ToonToBannerRepository } from '../repository/toonToBanner.repository';
import { ToonToBanner } from '../entity/toonToBanner.entity';
import { ToonHashTagDto } from './dto/toon-hashtag.dto';
import { HashTagRepository } from '../repository/hashtag.repository';
import { HashTag } from '../entity/hashtag.entity';
import { Toon } from '../entity/toon.entity';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { RecommnededRepository } from 'src/repository/recommended.repository';
import {
  GetToonDetailConfig,
  RecommendConfig,
  ToonConfig,
} from './config/type.config';
import { StorageRepository } from 'src/repository/storage.repository';
import { NicknameRepository } from 'src/repository/nickname.repository';
@Injectable()
export class ToonService {
  constructor(
    @InjectRepository(ToonRepository)
    private toonRepository: ToonRepository,

    @InjectRepository(BannerRepository)
    private bannerRepository: BannerRepository,

    @InjectRepository(ToonToBannerRepository)
    private toonToBanenrRepository: ToonToBannerRepository,

    @InjectRepository(HashTagRepository)
    private hashTagRepository: HashTagRepository,

    @InjectRepository(RecommnededRepository)
    private recommendedRepository: RecommnededRepository,

    @InjectRepository(NicknameRepository)
    private nicknameRepository: NicknameRepository,

    @InjectRepository(StorageRepository)
    private storageRepository: StorageRepository,
  ) {}
  // 인스타툰 링크주소 생성
  async createToon(toonDto: ToonDto): Promise<any> {
    return this.toonRepository.createToon(toonDto);
  }

  // 인스타툰 전체 목록 가져오기
  async getAllToons(): Promise<CommonResponseDto> {
    return this.toonRepository.getAllToons();
  }

  // 새로 등록된 인스타툰 API
  async getRecentToons(): Promise<CommonResponseDto> {
    return this.toonRepository.getRecentToons();
  }

  // 랜덤 툰 API
  async getRandomToons(): Promise<CommonResponseDto> {
    return this.toonRepository.getRandomToons();
  }
  // 실시간 인기툰 API
  async getPopularList(): Promise<CommonResponseDto> {
    return this.toonRepository.getPopularList();
  }
  // 인스타툰 상세 정보 가져오기
  async getToonDetailById(
    nickName: string,
    toonId: number,
  ): Promise<CommonResponseDto> {
    const getToonDetail: GetToonDetailConfig = {
      nickName: nickName,
      toonId: toonId,
      recommendedRepository: this.recommendedRepository,
      nicknameRepository: this.nicknameRepository,
      storageRepository: this.storageRepository,
    };
    return this.toonRepository.getToonDetailById(getToonDetail);
  }

  async getToonById(ids: Array<number>): Promise<ToonConfig[]> {
    return this.toonRepository.getToonById(ids);
  }
  // 추천하기 추가
  async patchRecommended(
    recommendConfig: RecommendConfig,
  ): Promise<CommonResponseDto> {
    this.recommendedRepository;
    return this.toonRepository.patchRecommended(
      recommendConfig,
      this.recommendedRepository,
    );
  }

  // HTML Rendering
  showHtmlRendering(name: string): string {
    return name;
  }

  //인스타툰 배너에 등록하기
  async registerToBanner(relationDto: RelationDto): Promise<any> {
    try {
      const banner = await this.bannerRepository.findOne(relationDto.bannerId);
      const toon = await this.toonRepository.findOne(relationDto.toonId);
      const toonToBanner = new ToonToBanner();
      if (!toon || !banner) {
        throw new NotFoundException(
          Object.assign({
            statusCode: 404,
            ok: false,
            message: 'id가 존재하지 않습니다.',
          }),
        );
      }
      toonToBanner.banner = banner;
      toonToBanner.toon = toon;
      const result = await this.toonToBanenrRepository.save(toonToBanner);
      return Object.assign({
        data: result,
        statusCode: 201,
        ok: true,
        message: '인스타툰이 배너에 등록되었습니다.',
      });
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }

  //인스타툰에 태그 달기
  async registerHashtag(toonHashDto: ToonHashTagDto): Promise<any> {
    try {
      const hashTagId: number[] = toonHashDto.hashTagIds;
      const toonId: number = toonHashDto.toonId;
      const toon: Toon = await this.toonRepository.findOne(toonId);
      const result: HashTag[] = await this.hashTagRepository
        .createQueryBuilder('hashtag')
        .where('hashtag.id IN (:...hashTagId)', { hashTagId })
        .getMany();

      if (!toon || !result) {
        throw new NotFoundException(
          Object.assign({
            statusCode: 404,
            ok: false,
            message: 'id가 존재하지 않습니다.',
          }),
        );
      }

      toon.tag = result;
      await this.toonRepository.save(toon);
      return Object.assign({
        data: result,
        statusCode: 201,
        ok: true,
        message: '인스타툰에 태그가 등록되었습니다.',
      });
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }
}
