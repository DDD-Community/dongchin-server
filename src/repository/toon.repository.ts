import {
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ToonDto } from '../toon/dto/toon-create.dto';
import { Toon } from '../entity/toon.entity';

@EntityRepository(Toon)
export class ToonRepository extends Repository<Toon> {
  async createToon(toonDto: ToonDto): Promise<any> {
    const { url, name } = toonDto;

    const instaToon = this.create({ url, name });

    try {
      const result = await this.save(instaToon); // 인스타툰 링크/name 저장
      return Object.assign({
        data: result,
        statusCode: 201,
        ok: true,
        message: '인스타툰이 등록되었습니다.',
      });
    } catch (error) {
      // url 중복될 때 error
      Logger.verbose('error code', error.code);
      throw new BadRequestException(
        Object.assign({
          statusCode: 400,
          ok: false,
          message: 'url이 중복됩니다.',
        }),
      );
    }
  }
}
