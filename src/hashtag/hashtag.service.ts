import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { ToonFindAllOptions } from 'src/toon/config/type.config';
import { HashTagRepository } from '../repository/hashtag.repository';
import {
  ToonFindAllOptions,
  ToonRepository,
} from '../repository/toon.repository';
import { HashTagDto } from './dto/hashtag-create.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(HashTagRepository)
    private hashTagRepository: HashTagRepository,

    @InjectRepository(ToonRepository)
    private toonRepository: ToonRepository,
  ) {}

  async createHashtag(hashTagDto: HashTagDto): Promise<CommonResponseDto> {
    return this.hashTagRepository.createHashtag(hashTagDto);
  }

  async getAllTags(): Promise<CommonResponseDto> {
    return this.hashTagRepository.getAllTags();
  }

  async getPopularKeyWords(): Promise<CommonResponseDto> {
    return this.hashTagRepository.getPopularKeyWords();
  }

  async findAll(search: ToonFindAllOptions): Promise<CommonResponseDto> {
    return this.toonRepository.findAll(search);
  }

  async getTopicKeyWords(): Promise<CommonResponseDto> {
    return this.hashTagRepository.getTopicKeyWords();
  }

  async getDrawStyleKeyWords(): Promise<CommonResponseDto> {
    return this.hashTagRepository.getDrawStyleKeyWords();
  }
}

/**
 * try {
      const hashtag = await this.hashTagRepository
        .createQueryBuilder('hashtag')
        .where('hashtag.title = :title', { title: tagName })
        .getOne();

      const toons = await this.toonRepository
        .createQueryBuilder('toon')
        .select('toon', 'toon.tag')
        .innerJoinAndSelect('toon.tag', 'tag')
        .getMany();

      const result = [];
      if (!toons) return result;

      toons.forEach((toon) => {
        // keyword를 가지고 있는 인스타툰 filtering
        toon.tag.forEach((tag) => {
          if (tag.title === hashtag.title) {
            result.push(toon);
          }
        });
      });
      if (!hashtag || result.length === 0) {
        throw new NotFoundException(
          Object.assign({
            statusCode: 404,
            ok: false,
            message: '해쉬 태그가 존재하지 않거나 태그에 따른 toon이 없습니다.',
          }),
        );
      }

      hashtag.count += 1; // 검색 카운트 추가
      await this.hashTagRepository.save(hashtag);

      return result;
    } catch (NotFoundException) {
      throw NotFoundException;
    }
 */
