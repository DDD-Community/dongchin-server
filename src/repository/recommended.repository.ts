import { Recommended } from '../entity/recommended.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Recommended)
export class RecommnededRepository extends Repository<Recommended> {
  async addRecommended(nickName: string, toonId: number) {
    const result = await this.getRecommended(nickName, toonId);
    if (!result) {
      // data가 없다면
      const data = this.create({ nickName: nickName, toonId: toonId });
      await this.save(data);
      return true;
    } else {
      return false;
    }
  }

  async deleteRecommended(nickName: string, toonId: number) {
    const result = await this.getRecommended(nickName, toonId);
    if (!result) {
      return false;
    } else {
      await this.delete(result);
      return true;
    }
  }

  async getRecommended(nickName: string, toonId: number) {
    const result = await this.createQueryBuilder('recommended')
      .where('recommended.nickName = :nickName', { nickName: nickName })
      .andWhere('recommended.toonId = :toonId', { toonId: toonId })
      .getOne();

    if (!result) {
      return false;
    } else {
      return result;
    }
  }
}
