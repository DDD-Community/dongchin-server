import { HashTagRepository } from 'src/repository/hashtag.repository';
import { ToonRepository } from 'src/repository/toon.repository';
import { HashTagDto } from './dto/hashtag-create.dto';
export declare class HashtagService {
    private hashTagRepository;
    private toonRepository;
    constructor(hashTagRepository: HashTagRepository, toonRepository: ToonRepository);
    createHashtag(hashTagDto: HashTagDto): Promise<any>;
    getAllTags(): Promise<any>;
    getPopularKeyWords(): Promise<any>;
    getSearchKeyWord(tagName: string): Promise<any>;
    getTopicKeyWord(): Promise<any>;
    getDrawStyleKeyWord(): Promise<any>;
}
