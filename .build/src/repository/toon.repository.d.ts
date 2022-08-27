import { Repository } from 'typeorm';
import { ToonDto } from '../toon/dto/toon-create.dto';
import { Toon } from '../entity/toon.entity';
export declare class ToonRepository extends Repository<Toon> {
    createToon(toonDto: ToonDto): Promise<any>;
}
