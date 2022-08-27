import { ToonRepository } from 'src/repository/toon.repository';
import { BannerRepository } from '../repository/banner.repository';
import { BannerDto } from './dto/banner.dto';
export declare class BannerService {
    private bannerRepository;
    private toonRepository;
    constructor(bannerRepository: BannerRepository, toonRepository: ToonRepository);
    createBanner(bannerDto: BannerDto): Promise<any>;
    getAllBanners(): Promise<any>;
    getAllToonsByRandom(): Promise<any>;
    getAllToonsByBanner(id: number): Promise<any>;
}
