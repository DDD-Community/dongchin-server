import { NicknameRepository } from 'src/repository/nickname.repository';
import { StorageRepository } from 'src/repository/storage.repository';
import { ToonRepository } from 'src/repository/toon.repository';
import { ToonsListDto } from './dto/toon-list.dto';
export declare class StorageService {
    private storageRepository;
    private nicknameRepository;
    private toonRepository;
    constructor(storageRepository: StorageRepository, nicknameRepository: NicknameRepository, toonRepository: ToonRepository);
    createStorage(name: string, nickName: string): Promise<any>;
    getStorageByNickname(nickName: string): Promise<import("./dto/storage-list.dto").StorageDetailDto[]>;
    addToonByStorageId(storageId: number, toonId: number): Promise<any>;
    getToonsByStorageId(id: number): Promise<any>;
    deleteToonsByStorageId(id: number, toonsIdDto: ToonsListDto): Promise<any>;
    deleteStorageById(storageId: number): Promise<any>;
    updateStorageName(storageId: number, name: string): Promise<any>;
}
