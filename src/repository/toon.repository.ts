import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { ToonDto } from '../toon/dto/toon-create.dto';
import { Toon } from '../entity/toon.entity';

export interface ToonFindAllOptions {
  input?: string;
  tagIds?: number[];
}
@EntityRepository(Toon)
export class ToonRepository extends Repository<Toon> {
  async createToon(toonDto: ToonDto): Promise<any> {
    const instaToon = this.create(toonDto);

    try {
      const result = await this.save(instaToon); // 인스타툰 링크/name 저장
      return Object.assign({
        data: result,
        statusCode: 201,
        ok: true,
        message: '인스타툰이 등록되었습니다.',
      });
    } catch (error) {
      if (error.code === '23502') {
        throw new BadRequestException('column 에 추가적인 값이 필요합니다.');
      }
      throw new BadRequestException(
        Object.assign({
          statusCode: 400,
          ok: false,
          message: 'url이 중복됩니다.',
        }),
      );
    }
  }

  async getAllToons() {
    const query = this.createQueryBuilder('toon');
    const toons = await query.leftJoinAndSelect('toon.tag', 'tag').getMany();
    return Object.assign({
      data: toons,
      statusCode: 200,
      ok: true,
      message: '인스타툰 전체 리스트입니다.',
    });
  }

  async getToonById(toonId: number) {
    const query = this.createQueryBuilder('toon');
    const toon = await query
      .leftJoinAndSelect('toon.tag', 'tag')
      .where('toon.id = :id', { id: toonId })
      .getOne();
    return toon;
  }

  async getRecentToons() {
    try {
      const toons = await this.createQueryBuilder('toon')
        .leftJoinAndSelect('toon.tag', 'tag')
        .orderBy('toon.createAt', 'DESC')
        .take(3)
        .getMany();

      if (!toons) {
        throw new NotFoundException(
          Object.assign({
            statusCode: 404,
            ok: false,
            message: '등록된 툰이 없습니다.',
          }),
        );
      }
      return Object.assign({
        data: toons,
        statusCode: 200,
        ok: true,
        message: '최근 등록된 인스타툰 목록',
      });
    } catch (NotFoundException) {
      throw NotFoundException;
    }
  }

  async getRandomToons() {
    const toons = await this.createQueryBuilder('toon')
      .leftJoinAndSelect('toon.tag', 'tag')
      .getMany();

    toons.sort(() => Math.random() - 0.5);

    const randomToons = toons.splice(0, 4);
    return Object.assign({
      data: randomToons,
      statusCode: 200,
      ok: true,
      message: '추천 API 성공',
    });
  }

  async getPopularList() {
    const toons: Toon[] = await this.createQueryBuilder('toon')
      .leftJoinAndSelect('toon.tag', 'tag')
      .orderBy('toon.likeCount', 'DESC')
      .take(6)
      .getMany();

    return Object.assign({
      data: toons,
      statusCode: 200,
      ok: true,
      message: '조회 성공',
    });
  }

  async findAll(options: ToonFindAllOptions = {}) {
    const { input, tagIds } = options;
    const length = tagIds.length;
    const queryBuilder = this.createQueryBuilder('toon').leftJoinAndSelect(
      'toon.tag',
      'tag',
    );
    if (input === ' ' && tagIds.length === 0) {
      return {
        data: [],
        statusCode: 200,
        ok: true,
      };
    } else {
      if (length > 0) {
        const result = await queryBuilder.getMany();
        const filters = result.filter((toon) => {
          let cnt = 0;
          toon.tag.forEach((tag) => {
            tagIds.forEach((id) => {
              if (id === tag.id) {
                cnt++;
              }
            });
          });
          if (cnt == length) {
            return true;
          }
        });
        if (input === ' ') {
          return {
            data: [filters],
            statusCode: 200,
            ok: true,
          };
        } else {
          return this.filterTopic(filters, input);
        }
      } else {
        const result = await queryBuilder.getMany();
        return this.filterTopic(result, input);
      }
    }
  }
  filterTopic(toons: any, input: any) {
    const result = [];
    for (let i = 0; i < toons.length; i++) {
      for (let j = 0; j < toons[i].tag.length; j++) {
        if (
          toons[i].tag[j].category == 'subject' &&
          toons[i].tag[j].title.includes(input)
        ) {
          result.push(toons[i]);
        }
      }
    }
    return { data: [result], statusCode: 200, ok: true };
  }
}

// console.log(await queryBuilder.getMany());
// if (input === ' ' && tagIds.length === 0) {
//   return {
//     data: [],
//     total: 0,
//   };
// } else if (input === ' ' && tagIds.length !== 0) {
//   queryBuilder.where('1 = 1').andWhere(
//     new Brackets((qb) => {
//       qb.where('tag.id = :id', { id: tagIds[0] });
//       for (let i = 1; i < tagIds.length; i++) {
//         qb.andWhere('tag.id = :id', { id: tagIds[i] });
//       }
//     }),
//   );
// } else if (input !== ' ' && tagIds.length === 0) {
//   queryBuilder.where('tag.title like :input', { input: `%${input}` });
// } else {
//   queryBuilder.where('1 = 1').andWhere(
//     new Brackets((qb) => {
//       qb.where('tag.id = :id', { id: tagIds[0] });
//       for (let i = 1; i < tagIds.length; i++) {
//         qb.andWhere('tag.id = :id', { id: tagIds[i] });
//       }
//     }),
//   );
//   queryBuilder.andWhere('tag.title like :input', { input: `%${input}` });
// }
// const [items, total] = await queryBuilder.getManyAndCount();
// return { items, total };
