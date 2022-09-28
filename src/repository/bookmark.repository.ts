import { BookMark } from '../entity/bookmark.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BookMark)
export class BookMarkRepository extends Repository<BookMark> {
  async addBookMark(nickName: string, toonId: number) {
    const result = await this.createQueryBuilder('bookmark')
      .where('bookmark.nickName = :nickName', { nickName: nickName })
      .andWhere('bookmark.toonId = :toonId', { toonId: toonId })
      .getOne();

    if (!result) {
      // data가 없다면
      const data = this.create({ nickName: nickName, toonId: toonId });
      await this.save(data);
      return true;
    } else {
      return false;
    }
  }

  async deleteBookMark(nickName: string, toonId: number) {
    const result = await this.createQueryBuilder('bookmark')
      .where('bookmark.nickName = :nickName', { nickName: nickName })
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
