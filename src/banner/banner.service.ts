import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToonRepository } from '../repository/toon.repository';
import { BannerRepository } from '../repository/banner.repository';
import { BannerCredentialDto } from './dto/banner-create.dto';
import { ToonConfig } from 'src/toon/config/type.config';
import { BannerListDto } from './dto/banner-list.dto';
import { ToonService } from 'src/toon/toon.service';
import { CommonResponseDto } from 'src/api/common-response.dto';

const HEALING_URL = `${process.env.HEALING_URL}`;
const CAT_URL = `${process.env.CAT_URL}`;
const SALARY_URL = `${process.env.SALARY_URL}`;
@Injectable()
export class BannerService {
  private readonly catBannerList: BannerListDto;
  private readonly healingBannerList: BannerListDto;
  private readonly salaryBannerList: BannerListDto;
  private readonly bannerMap: any;
  constructor(
    @InjectRepository(BannerRepository)
    private bannerRepository: BannerRepository,

    @InjectRepository(ToonRepository)
    private toonRepository: ToonRepository,

    @Inject(ToonService)
    private readonly toonService: ToonService,
  ) {
    this.catBannerList = new BannerListDto(2, '고양이툰 배너', CAT_URL);
    this.healingBannerList = new BannerListDto(3, '힐링툰 배너', HEALING_URL);
    this.salaryBannerList = new BannerListDto(4, '직장인툰 배너', SALARY_URL);
    this.bannerMap = {
      2: this.catBannerList,
      3: this.healingBannerList,
      4: this.salaryBannerList,
    };
  }

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

  getBanners() {
    return new CommonResponseDto(200, true, '배너 목록', [
      this.catBannerList.getInfo(),
      this.healingBannerList.getInfo(),
      this.salaryBannerList.getInfo(),
    ]);
  }

  async getBannerDetail(id: number): Promise<CommonResponseDto> {
    const ids: Array<number> = await this.pushToonIds(id);
    const toons: ToonConfig[] = await this.getToonByIds(ids);
    try {
      const banner: BannerListDto = this.bannerMap[id];
      this.pushToonsToBanner(banner, toons);
      Logger.log(JSON.stringify(banner));
      return new CommonResponseDto(200, true, '해당 배너의 툰 리스트', banner);
    } catch (error) {
      Logger.log(error);
      throw new BadRequestException('잘못된 id입니다.');
    }
  }

  async getToonByIds(ids: Array<number>): Promise<ToonConfig[]> {
    try {
      return await this.toonService.getToonById(ids);
    } catch (error) {
      throw new BadRequestException('잘못된 id입니다.');
    }
  }

  pushToonsToBanner(bannerObject: BannerListDto, toons: ToonConfig[]) {
    bannerObject.addToons(toons);
  }

  async pushToonIds(id: number): Promise<Array<number>> {
    try {
      const ids: Array<number> = [];
      const banner = await this.toonRepository.getToonsWithBanner();

      banner.forEach(async (toon) => {
        if (toon.toonToBanners_bannerId === id) {
          ids.push(toon.toon_id);
        }
      });
      Logger.log('ids 배열', ids);
      return ids;
    } catch (error) {
      throw new BadRequestException('잘못된 id입니다.');
    }
  }
}
