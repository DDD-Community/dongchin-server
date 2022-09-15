import { Recommended } from '../entity/recommended.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Recommended)
export class RecommnededRepository extends Repository<Recommended> {
  async addRecommended(userId: number, toonId: number) {
    const result = await this.getRecommended(userId, toonId);
    if (!result) {
      // data가 없다면
      const data = this.create({ userId: userId, toonId: toonId });
      await this.save(data);
      return true;
    } else {
      return false;
    }
  }

  async deleteRecommended(userId: number, toonId: number) {
    const result = await this.getRecommended(userId, toonId);
    if (!result) {
      return false;
    } else {
      await this.delete(result);
      return true;
    }
  }

  async getRecommended(userId: number, toonId: number) {
    const result = await this.createQueryBuilder('recommended')
      .where('recommended.userId = :userId', { userId: userId })
      .andWhere('recommended.toonId = :toonId', { toonId: toonId })
      .getOne();

    if (!result) {
      return false;
    } else {
      return result;
    }
  }
}
