import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { HashTag } from '../entity/hashtag.entity';
import { HashTagDto } from '../hashtag/dto/hashtag-create.dto';
import { EntityRepository, Repository } from 'typeorm';
import { CommonResponseDto } from 'src/api/common-response.dto';

@EntityRepository(HashTag)
export class HashTagRepository extends Repository<HashTag> {
  private response: CommonResponseDto;
  async createHashtag(hashTagDto: HashTagDto): Promise<CommonResponseDto> {
    const { title, category } = hashTagDto;

    if (category === '주제' || category === '그림체') {
      const tag = this.create({ title, category });
      try {
        const result = await this.save(tag);
        this.response = new CommonResponseDto(
          201,
          true,
          '태그가 등록되었습니다.',
          [result],
        );
      } catch (error) {
        Logger.verbose('error code', error.code);

        throw new BadRequestException('url이 중복됩니다.');
      }
    } else {
      this.response = new CommonResponseDto(
        400,
        false,
        '카테고리 입력을 주제 또는 그림체 로 입력하세요',
      );
    }
    return this.response;
  }

  async getAllTags(): Promise<CommonResponseDto> {
    try {
      const query = this.createQueryBuilder('hashtag');
      const hashtags = await query.getMany();
      if (!hashtags) throw new NotFoundException('태그 목록이 없습니다.');
      this.response = new CommonResponseDto(
        200,
        true,
        '태그 목록 조회 성공',
        hashtags,
      );
      return this.response;
    } catch (error) {
      Logger.verbose('해시태그 전체 가져오기 문제', error);
    }
  }

  async getPopularKeyWords(): Promise<CommonResponseDto> {
    try {
      const hashtags = await this.createQueryBuilder('hashtag')
        .orderBy('hashtag.count', 'DESC')
        .limit(10)
        .getMany();

      if (!hashtags) {
        throw new NotFoundException('해쉬 태그가 존재하지 않습니다.');
      }
      this.response = new CommonResponseDto(
        200,
        true,
        '인기 검색 키워드',
        hashtags,
      );
      return this.response;
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }

  async getTopicKeyWords(): Promise<CommonResponseDto> {
    try {
      const tags = await this.createQueryBuilder('hashtag')
        .where('hashtag.category = :category', { category: 'subject' })
        .getMany();

      if (!tags) {
        throw new NotFoundException('주제 키워드가 존재하지 않습니다.');
      }
      this.response = new CommonResponseDto(
        200,
        true,
        '주제 키워드 list',
        tags,
      );
      return this.response;
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }

  async getDrawStyleKeyWords(): Promise<CommonResponseDto> {
    try {
      const tags = await this.createQueryBuilder('hashtag')
        .where('hashtag.category = :category', { category: 'drawing' })
        .getMany();

      if (!tags) {
        throw new NotFoundException('그림체 키워드가 존재하지 않습니다.');
      }
      this.response = new CommonResponseDto(
        200,
        true,
        '그림체 키워드 list',
        tags,
      );
      return this.response;
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }
}
