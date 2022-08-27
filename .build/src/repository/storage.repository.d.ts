import { Storage } from '../entity/storage.entity';
import { StorageDetailDto } from '../storage/dto/storage-list.dto';
import { ToonsListDto } from '../storage/dto/toon-list.dto';
import { Repository } from 'typeorm';
import { NicknameRepository } from './nickname.repository';
import { ToonRepository } from './toon.repository';
export declare class StorageRepository extends Repository<Storage> {
    createStorage(nicknameRepository: NicknameRepository, name: string, nickName: string): Promise<any>;
    getStorageByNickname(nicknameRepository: NicknameRepository, nickName: string): Promise<StorageDetailDto[]>;
    addToonByStorageId(toonRepository: ToonRepository, storageId: number, toonId: number): Promise<any>;
    getToonsByStorageId(id: number): Promise<any>;
    deleteToonsByStorageId(id: number, toonsIdDto: ToonsListDto): Promise<any>;
    deleteStorageById(storageId: number): Promise<any>;
    updateStorageName(storageId: number, name: string): Promise<any>;
}
