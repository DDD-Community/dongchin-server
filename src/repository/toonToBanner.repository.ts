import { ToonToBanner } from '../entity/toonToBanner.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ToonToBanner)
export class ToonToBannerRepository extends Repository<ToonToBanner> {}
