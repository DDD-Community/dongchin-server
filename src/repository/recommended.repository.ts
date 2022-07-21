import { Recommended } from '../entity/recommended.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Recommended)
export class RecommnededRepository extends Repository<Recommended> {
  async addRecommended(userId: number, toonId: number) {
    const result = await this.createQueryBuilder('bookmark')
      .where('bookmark.userId = :userId', { userId: userId })
      .andWhere('bookmark.toonId = :toonId', { toonId: toonId })
      .getOne();

    if (!result) {
      // data가 없다면
      const data = this.create({ userId: userId, toonId: toonId });
      await this.save(data);
      return Object.assign({
        statusCode: 200,
        success: true,
        message: '좋아요가 등록되었습니다.',
      });
    } else {
      throw new BadRequestException('이미 좋아요를 누른 인스타 툰입니다.');
    }
  }

  async deleteRecommended(userId: number, toonId: number) {
    const result = await this.createQueryBuilder('bookmark')
      .where('bookmark.userId = :userId', { userId: userId })
      .andWhere('bookmark.toonId = :toonId', { toonId: toonId })
      .getOne();

    if (!result) {
      throw new BadRequestException('이미 취소한 인스타툰입니다.');
    } else {
      const data = this.create({ userId: userId, toonId: toonId });
      await this.save(data);
      return Object.assign({
        statusCode: 200,
        success: true,
        message: '좋아요 취소되었습니다.',
      });
    }
  }
}
