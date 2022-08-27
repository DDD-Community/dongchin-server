import { Response } from 'express';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonHashTagDto } from './dto/toon-hashtag.dto';
import { ToonService } from './toon.service';
export declare class ToonController {
    private toonService;
    constructor(toonService: ToonService);
    showHtmlRendering(name: string, res: Response): void;
    getRecentToons(): Promise<any>;
    getPopularList(): Promise<any>;
    addRecommendedWithBookmark(userId: number, toonId: number, key: boolean): Promise<any>;
    getAllToons(): Promise<any>;
    getRandomToons(): Promise<any>;
    getToonById(id: number): Promise<any>;
    makeHeartCount(id: number, boolType: boolean): Promise<any>;
    createToon(toonDto: ToonDto): Promise<any>;
    registerToBanner(relationDto: RelationDto): Promise<any>;
    registerHashtag(toonHashDto: ToonHashTagDto): Promise<any>;
}
