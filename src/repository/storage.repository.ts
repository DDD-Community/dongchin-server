import { Nickname } from 'src/entity/nickname.entity';
import { Storage } from 'src/entity/storage.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {
  async createStorage(name: string, nickname: Nickname) {
    const storage = this.create({ name: name });
    storage.save(nickname);
    this.save(storage);
  }
}
