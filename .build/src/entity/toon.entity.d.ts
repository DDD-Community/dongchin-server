import { HashTag } from './hashtag.entity';
import { ToonToBanner } from './toonToBanner.entity';
export declare class Toon {
    id: number;
    authorName: string;
    instagramId: string;
    description: string;
    imgUrl: string;
    tag: HashTag[];
    instagramUrl: string;
    htmlUrl: string;
    likeCount: number;
    toonToBanners: ToonToBanner[];
    createAt: Date;
}
