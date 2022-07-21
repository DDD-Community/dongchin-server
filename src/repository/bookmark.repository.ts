import { BookMark } from 'src/entity/bookmark.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BookMark)
export class BookMarkRepository extends Repository<BookMark> {
  async addBookMark(userId: number, toonId: number) {
    const result = await this.createQueryBuilder('bookmark')
      .where('bookmark.userId = :userId', { userId: userId })
      .andWhere('bookmark.toonId = :toonId', { toonId: toonId })
      .getOne();

    if (!result) {
      // data가 없다면
      const data = this.create({ userId: userId, toonId: toonId });
      await this.save(data);
      return true;
    } else {
      return false;
    }
  }

  async deleteBookMark(userId: number, toonId: number) {
    const result = await this.createQueryBuilder('bookmark')
      .where('bookmark.userId = :userId', { userId: userId })
      .andWhere('bookmark.toonId = :toonId', { toonId: toonId })
      .getOne();

    if (!result) {
      return false;
    } else {
      await this.delete(result);
      return true;
    }
  }
}
