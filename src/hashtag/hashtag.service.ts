import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { ToonFindAllOptions } from 'src/toon/config/type.config';
import { HashTagRepository } from '../repository/hashtag.repository';
import { ToonRepository } from '../repository/toon.repository';
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
