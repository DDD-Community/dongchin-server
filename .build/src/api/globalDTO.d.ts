import { Banner } from 'src/entity/banner.entity';
import { HashTag } from 'src/entity/hashtag.entity';
import { Nickname } from 'src/entity/nickname.entity';
import { Toon } from 'src/entity/toon.entity';
export declare class responseFailDto {
    statusCode: number;
    ok: boolean;
    message: string;
}
export declare class responseDto {
    data: Nickname;
    statusCode: number;
    ok: boolean;
    message: string;
}
export declare class responseListDto {
    data: Toon[];
    statusCode: number;
    ok: boolean;
    message: string;
}
export declare class responseToonDto {
    data: Toon;
    statusCode: number;
    ok: boolean;
    message: string;
}
export declare class responseBannerDto {
    data: Banner;
    statusCode: number;
    ok: boolean;
    message: string;
}
export declare class responseBannerListDto {
    data: Banner[];
    statusCode: number;
    ok: boolean;
    message: string;
}
export declare class responseTagListDto {
    data: HashTag[];
    statusCode: number;
    ok: boolean;
    message: string;
}
export declare class responseTagDto {
    data: HashTag;
    statusCode: number;
    ok: boolean;
    message: string;
}
