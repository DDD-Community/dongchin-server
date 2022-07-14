import { Storage } from 'src/entity/storage.entity';
import { StorageDto } from 'src/storage/dto/storage-create.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {
  async createStorage(storageDto: StorageDto) {}
}
