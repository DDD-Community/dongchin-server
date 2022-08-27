import { Repository } from 'typeorm';
import { Banner } from '../entity/banner.entity';
import { BannerDto } from '../banner/dto/banner.dto';
export declare class BannerRepository extends Repository<Banner> {
    createBanner(bannerDto: BannerDto): Promise<any>;
}
