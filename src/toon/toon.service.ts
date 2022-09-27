import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
import { BookMarkRepository } from '../repository/bookmark.repository';
import { RecommnededRepository } from '../repository/recommended.repository';
import { ToonDetailDto } from './dto/toon-detail.dto';

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

    @InjectRepository(BookMarkRepository)
    private bookmarkRepository: BookMarkRepository,

    @InjectRepository(RecommnededRepository)
    private recommendedRepository: RecommnededRepository,
  ) {}

  // 인스타툰 링크주소 생성
  async createToon(toonDto: ToonDto): Promise<any> {
    return this.toonRepository.createToon(toonDto);
  }

  // 인스타툰 전체 목록 가져오기
  async getAllToons() {
    return this.toonRepository.getAllToons();
  }

  // 새로 등록된 인스타툰 API
  async getRecentToons(): Promise<any> {
    return this.toonRepository.getRecentToons();
  }

  // 랜덤 툰 API
  async getRandomToons() {
    return this.toonRepository.getRandomToons();
  }

  //실시간 인기툰 API
  async getPopularList(): Promise<any> {
    return this.toonRepository.getPopularList();
  }

  showHtmlRendering(name: string): string {
    return name;
  }

  // 인스타툰 상세 정보 가져오기
  async getToonById(userId: number, toonId: number) {
    let toonDetail: ToonDetailDto;
    const toon = await this.toonRepository.getToonById(toonId);
    const recommend = await this.recommendedRepository.getRecommended(
      userId,
      toonId,
    );
    if (!toon) throw new NotFoundException('존재하지 않는 id입니다.');
    if (!recommend) {
      toonDetail = new ToonDetailDto(toon, false);
    } else {
      toonDetail = new ToonDetailDto(toon, true);
    }
    return Object.assign({
      data: [toonDetail],
      statusCode: 200,
      ok: true,
      message: '성공',
    });
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

  // 북마크 및 좋아요 추가
  async addRecommendedWithBookmark(
    userId: number,
    toonId: number,
    key: boolean,
  ) {
    if (key) {
      const recommendResult = await this.recommendedRepository.addRecommended(
        userId,
        toonId,
      );
      const bookmarkResult = await this.bookmarkRepository.addBookMark(
        userId,
        toonId,
      );

      if (recommendResult === true && bookmarkResult === true) {
        return Object.assign({
          statusCode: 200,
          message: '좋아요 및 북마크 추가',
          success: 'true',
          ok: true,
        });
      } else {
        throw new BadRequestException(
          '이미 좋아요 및 북마크를 등록한 툰입니다.',
        );
      }
    } else {
      const recommendResult =
        await this.recommendedRepository.deleteRecommended(userId, toonId);
      const bookmarkResult = await this.bookmarkRepository.deleteBookMark(
        userId,
        toonId,
      );

      if (recommendResult === true && bookmarkResult === true) {
        return Object.assign({
          statusCode: 200,
          message: '좋아요 및 북마크 취소',
          success: 'true',
          ok: false,
        });
      } else {
        throw new BadRequestException(
          '이미 좋아요 및 북마크를 취소된 툰입니다.',
        );
      }
    }
  }
}
