import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerRepository } from 'src/repository/banner.repository';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonRepository } from '../repository/toon.repository';
import { ToonToBannerRepository } from 'src/repository/toonToBanner.repository';
import { ToonToBanner } from 'src/entity/toonToBanner.entity';
import { ToonHashTagDto } from './dto/toon-hashtag.dto';
import { HashTagRepository } from 'src/repository/hashtag.repository';
import { HashTag } from 'src/entity/hashtag.entity';
import { Toon } from 'src/entity/toon.entity';

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
  ) {}

  // 인스타툰 링크주소 생성
  async createToon(toonDto: ToonDto): Promise<any> {
    return this.toonRepository.createToon(toonDto);
  }

  // 인스타툰 전체 목록 가져오기
  async getAllToons() {
    const query = this.toonRepository.createQueryBuilder('toon');
    const toons = await query.leftJoinAndSelect('toon.tag', 'tag').getMany();
    return Object.assign({
      data: toons,
      statusCode: 200,
      ok: true,
      message: '인스타툰 전체 리스트입니다.',
    });
  }

  async getToonById(id: number) {
    const query = this.toonRepository.createQueryBuilder('toon');
    const toon = await query
      .innerJoinAndSelect('toon.tag', 'tag')
      .where('toon.id = :id', { id: id })
      .getOne();

    if (!toon) throw new NotFoundException('존재하지 않는 id입니다.');

    console.log(toon);
    return toon;
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
      Logger.verbose('banner', JSON.stringify(banner));
      Logger.verbose('toon', JSON.stringify(toon));
      Logger.verbose('result', JSON.stringify(result));
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
      Logger.verbose('result', JSON.stringify(result));
      Logger.verbose('hashTagId', hashTagId);
      Logger.verbose('toonId', toonId);
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

  // 새로 등록된 인스타툰 API
  async getRecentToons(): Promise<any> {
    try {
      const toons = await this.toonRepository
        .createQueryBuilder('toon')
        .orderBy('toon.createAt', 'DESC')
        .take(3)
        .getMany();

      if (!toons) {
        throw new NotFoundException(
          Object.assign({
            statusCode: 404,
            ok: false,
            message: '등록된 툰이 없습니다.',
          }),
        );
      }
      Logger.verbose('새로 등록된 인스타툰', JSON.stringify(toons));
      return Object.assign({
        data: toons,
        statusCode: 200,
        ok: true,
        message: '최근 등록된 인스타툰 목록',
      });
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }

  //인스타툰 작품 하트 수 증가 또는 감소 API
  async makeHeartCount(id: number, boolType: boolean): Promise<any> {
    Logger.verbose(id, boolType);
    try {
      const toon = await this.toonRepository.findOne(id);
      if (!toon) {
        throw new NotFoundException(
          Object.assign({
            statusCode: 404,
            ok: false,
            message: '등록된 툰이 없습니다.',
          }),
        );
      } else {
        if (boolType) {
          // boolType is true 하트 수 증가
          toon.likeCount += 1;
        } else {
          if (toon.likeCount >= 1) {
            toon.likeCount -= 1;
          }
        }
        await this.toonRepository.save(toon);
      }
      return Object.assign({
        statusCode: 200,
        ok: true,
        message: '성공적으로 작업하였습니다.',
      });
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }

  //실시간 인기툰 API
  async getPopularList(): Promise<any> {
    const toons: Toon[] = await this.toonRepository
      .createQueryBuilder('toon')
      .orderBy('toon.likeCount', 'DESC')
      .take(6)
      .execute();

    return toons;
  }

  showHtmlRendering(name: string): string {
    return name;
  }
}
