import { BannerRepository } from 'src/repository/banner.repository';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonRepository } from '../repository/toon.repository';
import { ToonToBannerRepository } from 'src/repository/toonToBanner.repository';
import { ToonHashTagDto } from './dto/toon-hashtag.dto';
import { HashTagRepository } from 'src/repository/hashtag.repository';
import { BookMarkRepository } from 'src/repository/bookmark.repository';
import { RecommnededRepository } from 'src/repository/recommended.repository';
export declare class ToonService {
    private toonRepository;
    private bannerRepository;
    private toonToBanenrRepository;
    private hashTagRepository;
    private bookmarkRepository;
    private recommendedRepository;
    constructor(toonRepository: ToonRepository, bannerRepository: BannerRepository, toonToBanenrRepository: ToonToBannerRepository, hashTagRepository: HashTagRepository, bookmarkRepository: BookMarkRepository, recommendedRepository: RecommnededRepository);
    createToon(toonDto: ToonDto): Promise<any>;
    getAllToons(): Promise<any>;
    getToonById(id: number): Promise<any>;
    registerToBanner(relationDto: RelationDto): Promise<any>;
    registerHashtag(toonHashDto: ToonHashTagDto): Promise<any>;
    getRecentToons(): Promise<any>;
    makeHeartCount(id: number, boolType: boolean): Promise<any>;
    getPopularList(): Promise<any>;
    showHtmlRendering(name: string): string;
    addRecommendedWithBookmark(userId: number, toonId: number, key: boolean): Promise<any>;
    getRandomToons(): Promise<any>;
}
