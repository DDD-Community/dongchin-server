import { HashTagDto } from './dto/hashtag-create.dto';
import { HashtagService } from './hashtag.service';
export declare class HashtagController {
    private hashTagService;
    constructor(hashTagService: HashtagService);
    createHasgtag(hashTagDto: HashTagDto): Promise<any>;
    getAllTags(): Promise<any>;
    getPopularKeyWords(): Promise<any>;
    getSearchKeyWord(tagName: string): Promise<any>;
    getTopicKeyWord(): Promise<any>;
    getDrawStyleKeyWord(): Promise<any>;
}
