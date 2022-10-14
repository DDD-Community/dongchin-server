import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToonRepository } from '../repository/toon.repository';
import { BannerRepository } from '../repository/banner.repository';
import { BannerDto } from './dto/banner.dto';
import { RecommnededRepository } from 'src/repository/recommended.repository';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { ToonConfig, ToonDetailConfig } from 'src/toon/config/type.config';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerRepository)
    private bannerRepository: BannerRepository,

    @InjectRepository(ToonRepository)
    private toonRepository: ToonRepository,

    @InjectRepository(RecommnededRepository)
    private recommendedRepository: RecommnededRepository,
  ) {}

  async createBanner(bannerDto: BannerDto) {
    // 배너 생성
    return this.bannerRepository.createBanner(bannerDto);
  }

  async getAllBanners() {
    // 배너 목록 조회
    try {
      const query = this.bannerRepository.createQueryBuilder('banner');
      const banners = await query.getMany();
      if (!banners)
        throw new NotFoundException(
          Object.assign({
            statusCode: 404,
            ok: false,
            message: '배너 목록이 없습니다.',
          }),
        );
      return Object.assign({
        data: banners,
        statusCode: 200,
        ok: true,
        message: '배너 목록 조회 성공',
      });
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }

  async getAllToonsByRandom(nickName: string) {
    // 랜덤 배너 가져오기
    const toonQuery = this.toonRepository
      .createQueryBuilder('toon')
      .leftJoinAndSelect('toon.tag', 'tag');
    const toons: ToonConfig[] = await toonQuery.getMany();
    toons.sort(() => Math.random() - 0.5);
    const randomToon: ToonConfig = toons.splice(0, 1)[0];
    const recommend = await this.recommendedRepository.getRecommended(
      nickName,
      randomToon.id,
    );
    const toonDetail: ToonDetailConfig = {
      id: randomToon.id,
      authorName: randomToon.authorName,
      instagramId: randomToon.instagramId,
      description: randomToon.description,
      imgUrl: randomToon.imgUrl,
      instagramUrl: randomToon.instagramUrl,
      htmlUrl: randomToon.htmlUrl,
      likeCount: randomToon.likeCount,
      createAt: randomToon.createAt,
      tag: randomToon.tag,
      isRecommended: true,
    };
    if (!recommend) {
      toonDetail.isRecommended = false;
    }
    return new CommonResponseDto(200, true, '랜덤으로 툰 가져오기 성공', [
      toonDetail,
    ]);
  }

  async getAllToonsByBanner(id: number) {
    try {
      const toonsId = await this.bannerRepository
        .createQueryBuilder('banner')
        .leftJoinAndSelect('banner.toonToBanners', 'toonToBanners')
        .where('banner.id = :id', { id: id })
        .getRawMany();
      if (!toonsId) {
        throw new NotFoundException({
          statusCode: 404,
          ok: false,
          message: 'banner Id를 찾을 수 없습니다.',
        });
      }
      const result = [];
      toonsId.forEach((toon) => {
        result.push(toon.toonToBanners_toonId);
        return toon.toonToBanners_toonId;
      });

      const toons = await this.toonRepository
        .createQueryBuilder('toon')
        .whereInIds(result)
        .getMany();
      Logger.verbose('toons', toons);
      return Object.assign({
        data: toons,
        statusCode: 200,
        message: 'banner의 인스타툰 가져오기 성공',
      });
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }
}
