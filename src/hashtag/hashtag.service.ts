import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashTagRepository } from 'src/repository/hashtag.repository';
import { ToonRepository } from 'src/repository/toon.repository';
import { HashTagDto } from './dto/hashtag-create.dto';

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(HashTagRepository)
        private hashTagRepository: HashTagRepository,

        @InjectRepository(ToonRepository)
        private toonRepository: ToonRepository
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


    async getSearchKeyWord(tagName: String): Promise<any> {
        try{
            const hashtag = await this.hashTagRepository
            .createQueryBuilder('hashtag')
            .where("hashtag.title = :title", { title: tagName })
            .getOne()

            const toons = await this.toonRepository
            .createQueryBuilder('toon')
            .select('toon', 'toon.hashTags')
            .leftJoinAndSelect('toon.hashTags', 'hashtag', '')
            .getMany()

            if(!hashtag || !toons){
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: "해쉬 태그가 존재하지 않거나 태그에 따른 toon이 없습니다."
                }))
            }
            const result = []
            toons.forEach((toon) => { // keyword를 가지고 있는 인스타툰 filtering
                toon.hashTags.forEach((tag) => {
                    if(tag.title === hashtag.title){
                        result.push(toon);
                    }
                })
            })
            return result;
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async getTopicKeyWord(): Promise<any> {
        try{
            const tags = await this.hashTagRepository
            .createQueryBuilder('hashtag')
            .where('hashtag.category = :category', {category: '주제'})
            .getMany()
            
            if(!tags){
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: "주제 키워드가 존재하지 않습니다."
                }))
            }

            return Object.assign({
                data: tags,
                statusCode: 200,
                ok: true,
                message:"주제 키워드 list"
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }


    async getDrawStyleKeyWord(): Promise<any> {
        try{
            const tags = await this.hashTagRepository
            .createQueryBuilder('hashtag')
            .where('hashtag.category = :category', {category: '그림체'})
            .getMany()
            
            if(!tags){
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: "그림체 키워드가 존재하지 않습니다."
                }))
            }

            return Object.assign({
                data: tags,
                statusCode: 200,
                ok: true,
                message:"그림체 키워드 list"
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }
}
