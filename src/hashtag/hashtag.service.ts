import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashTagRepository } from 'src/repository/hashtag.repository';
import { HashTagDto } from './dto/hashtag-create.dto';

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(HashTagRepository)
        private hashTagRepository: HashTagRepository
    ){}

    async createHashtag(hashTagDto: HashTagDto): Promise<any> {
        return this.hashTagRepository.createHashtag(hashTagDto);
    }


    async getAllTags(): Promise<any> {
        try{
            const query = this.hashTagRepository.createQueryBuilder('hashtag');
            const hashtags = await query.getMany();
            if(!hashtags) throw new NotFoundException(Object.assign({
                statusCode: 404,
                ok: false,
                message: "태그 목록이 없습니다."
            }))
            return Object.assign({
                data: hashtags,
                statusCode: 200,
                ok: true,
                message: "태그 목록 조회 성공"
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }

    async getPopularKeyWords(): Promise<any> {
        try{
            const hashtags = await this.hashTagRepository
            .createQueryBuilder('hashtag')
            .orderBy('hashtag.count', 'DESC')
            .limit(10)
            .getMany()

            if(!hashtags){
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: "해쉬 태그가 존재하지 않습니다."
                }))
            }
            
            return Object.assign({
                data: hashtags,
                statusCode: 200,
                ok: true,
                message:"인기 검색 키워드"
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }
}
