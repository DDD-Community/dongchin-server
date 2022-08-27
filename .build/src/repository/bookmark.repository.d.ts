import { BookMark } from 'src/entity/bookmark.entity';
import { Repository } from 'typeorm';
export declare class BookMarkRepository extends Repository<BookMark> {
    addBookMark(userId: number, toonId: number): Promise<boolean>;
    deleteBookMark(userId: number, toonId: number): Promise<boolean>;
}
