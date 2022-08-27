import { HashTag } from '../entity/hashtag.entity';
import { HashTagDto } from '../hashtag/dto/hashtag-create.dto';
import { Repository } from 'typeorm';
export declare class HashTagRepository extends Repository<HashTag> {
    createHashtag(hashTagDto: HashTagDto): Promise<any>;
}
