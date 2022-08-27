import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';
export declare class BannerController {
    private bannerService;
    constructor(bannerService: BannerService);
    createBanner(bannerDto: BannerDto): Promise<any>;
    getAllBanners(): Promise<any>;
    getAllToonsByRandom(): Promise<any>;
    getAllToonsByBanner(id: number): Promise<any>;
}
