import { StorageDto } from './dto/storage-create.dto';
import { StorageToonDto } from './dto/storage-toon.dto';
import { ToonsListDto } from './dto/toon-list.dto';
import { StorageService } from './storage.service';
export declare class StorageController {
    private storageService;
    constructor(storageService: StorageService);
    createStorage(storageCreateDto: StorageDto): Promise<any>;
    addToonByStorageId(storageToonDto: StorageToonDto): Promise<any>;
    getStorageByNickname(nickName: string): Promise<import("./dto/storage-list.dto").StorageDetailDto[]>;
    getToonsByStorageId(id: number): Promise<any>;
    deleteStorageById(storageId: number): Promise<any>;
    deleteToonsByStorageId(id: number, toonsIdDto: ToonsListDto): Promise<any>;
    updateStorageName(storageId: number, name: string): Promise<any>;
}
