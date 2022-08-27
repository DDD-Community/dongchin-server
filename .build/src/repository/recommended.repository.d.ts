import { Recommended } from '../entity/recommended.entity';
import { Repository } from 'typeorm';
export declare class RecommnededRepository extends Repository<Recommended> {
    addRecommended(userId: number, toonId: number): Promise<boolean>;
    deleteRecommended(userId: number, toonId: number): Promise<boolean>;
}
