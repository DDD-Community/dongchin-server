import { BadRequestException, Logger } from '@nestjs/common';
import { HashTag } from 'src/entity/hashtag.entity';
import { HashTagDto } from 'src/hashtag/dto/hashtag-create.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(HashTag)
export class HashTagRepository extends Repository<HashTag> {
  async createHashtag(hashTagDto: HashTagDto): Promise<any> {
    const { title, category } = hashTagDto;

    if (category === '주제' || category === '그림체') {
      const tag = this.create({ title, category });
      try {
        const result = await this.save(tag);
        return Object.assign({
          data: result,
          statusCode: 201,
          ok: true,
          message: '태그가 등록되었습니다.',
        });
      } catch (error) {
        Logger.verbose('error code', error.code);
        throw new BadRequestException(
          Object.assign({
            statusCode: 400,
            ok: false,
            message: 'url이 중복됩니다.',
          }),
        );
      }
    } else {
      return Object.assign({
        statusCode: 400,
        ok: false,
        message: "카테고리 입력을 '주제' 또는 '그림체'로 입력하세요",
      });
    }
  }
}
