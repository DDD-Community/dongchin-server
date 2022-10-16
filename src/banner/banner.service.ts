import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToonRepository } from '../repository/toon.repository';
import { BannerRepository } from '../repository/banner.repository';
import { BannerCredentialDto } from './dto/banner-create.dto';
import { ToonConfig } from 'src/toon/config/type.config';
import { BannerListDto } from './dto/banner-list.dto';
import { ToonService } from 'src/toon/toon.service';
import { BannerToon } from './dto/banner.dto';

@Injectable()
export class BannerService {
  private HEALING_URL = `${process.env.HEALING_URL}`;
  private CAT_URL = `${process.env.CAT_URL}`;
  private SALARY_URL = `${process.env.SALARY_URL}`;
  constructor(
    @InjectRepository(BannerRepository)
    private bannerRepository: BannerRepository,

    @InjectRepository(ToonRepository)
    private toonRepository: ToonRepository,

    @Inject(ToonService)
    private readonly toonService: ToonService,
  ) {}

  async createBanner(bannerDto: BannerCredentialDto) {
    // 배너 생성
    return this.bannerRepository.createBanner(bannerDto);
  }

  async getAllToonsByRandom(nickName: string) {
    // 랜덤 배너 가져오기
    const toonQuery = this.toonRepository
      .createQueryBuilder('toon')
      .leftJoinAndSelect('toon.tag', 'tag');
    const toons: ToonConfig[] = await toonQuery.getMany();
    toons.sort(() => Math.random() - 0.5);
    const randomToon: ToonConfig = toons.splice(0, 1)[0];
    return await this.toonService.getToonDetailById(nickName, randomToon.id);
  }

  async getToonsByCatBanner(
    catBannerList: BannerListDto = new BannerListDto(
      '고양이툰 배너',
      this.CAT_URL,
    ),
  ): Promise<BannerListDto> {
    const ids: Array<number> = await this.pushToonIds(2);
    const toons: ToonConfig[] = await this.getToonByIds(ids);
    this.pushToonsToBanner(catBannerList, toons);
    return catBannerList;
  }

  async getToonsByHealingBanner(
    healingBannerList: BannerListDto = new BannerListDto(
      '힐링툰 배너',
      this.HEALING_URL,
    ),
  ): Promise<BannerListDto> {
    const ids: Array<number> = await this.pushToonIds(3);
    const toons: ToonConfig[] = await this.getToonByIds(ids);
    this.pushToonsToBanner(healingBannerList, toons);
    return healingBannerList;
  }

  async getToonsBySalaryBanner(
    salaryBannerList: BannerListDto = new BannerListDto(
      '직장인툰 배너',
      this.SALARY_URL,
    ),
  ): Promise<BannerListDto> {
    const ids: Array<number> = await this.pushToonIds(4);
    const toons: ToonConfig[] = await this.getToonByIds(ids);
    this.pushToonsToBanner(salaryBannerList, toons);
    return salaryBannerList;
  }

  async getToonByIds(ids: Array<number>) {
    return await this.toonService.getToonById(ids);
  }

  pushToonsToBanner(bannerObject: BannerListDto, toons: ToonConfig[]) {
    toons.forEach((toon) => {
      const tagIds: Array<number> = [];
      toon.tag.forEach((info) => {
        if (info.category === 'subject') tagIds.push(info.id);
      });
      bannerObject.addToons(new BannerToon(toon.imgUrl, toon.id, tagIds));
    });
  }

  async pushToonIds(id: number) {
    const ids: Array<number> = [];
    const banner = await this.toonRepository.getToonsWithBanner();

    banner.forEach(async (toon) => {
      if (toon.toonToBanners_bannerId === id) {
        ids.push(toon.toon_id);
      }
    });
    Logger.log('ids 배열', ids);
    return ids;
  }
}
