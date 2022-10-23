import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Banner } from '../entity/banner.entity';
import { BannerCredentialDto } from '../banner/dto/banner-create.dto';

@EntityRepository(Banner)
export class BannerRepository extends Repository<Banner> {
  async createBanner(bannerDto: BannerCredentialDto) {
    const { name } = bannerDto;
    const banner = this.create({ name });

    try {
      await this.save(banner);
      Logger.verbose('banner', JSON.stringify(banner));
      return Object.assign({
        data: banner,
        statusCode: 201,
        ok: true,
        message: '배너 생성 성공',
      });
    } catch (error) {
      // 일단 에러 표시
      Logger.verbose('code', error.code);
    }
  }
}
