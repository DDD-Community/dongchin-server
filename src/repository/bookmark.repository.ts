import { BookMark } from 'src/entity/bookmark.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BookMark)
export class BookMarkRepository extends Repository<BookMark> {
  async addBookMark(userId: number, toonId: number) {
    const result = await this.createQueryBuilder('bookmark')
      .where('bookmark.userId = :userId', { userId: userId })
      .andWhere('bookmark.toonId = :toonId', { toonId: toonId })
      .getOne();

    console.log(result);
  }

  async deleteBookMark(userId: number, toonId: number) {}
}
