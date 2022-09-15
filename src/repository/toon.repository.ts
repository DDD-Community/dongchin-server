import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ToonDto } from '../toon/dto/toon-create.dto';
import { Toon } from '../entity/toon.entity';

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
}
