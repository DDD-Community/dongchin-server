"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nickname_repository_1 = require("src/repository/nickname.repository");
const storage_repository_1 = require("src/repository/storage.repository");
const toon_repository_1 = require("src/repository/toon.repository");
let StorageService = class StorageService {
    constructor(storageRepository, nicknameRepository, toonRepository) {
        this.storageRepository = storageRepository;
        this.nicknameRepository = nicknameRepository;
        this.toonRepository = toonRepository;
    }
    async createStorage(name, nickName) {
        return this.storageRepository.createStorage(this.nicknameRepository, name, nickName);
    }
    async getStorageByNickname(nickName) {
        return this.storageRepository.getStorageByNickname(this.nicknameRepository, nickName);
    }
    async addToonByStorageId(storageId, toonId) {
        return this.storageRepository.addToonByStorageId(this.toonRepository, storageId, toonId);
    }
    async getToonsByStorageId(id) {
        return this.storageRepository.getToonsByStorageId(id);
    }
    async deleteToonsByStorageId(id, toonsIdDto) {
        return this.storageRepository.deleteToonsByStorageId(id, toonsIdDto);
    }
    async deleteStorageById(storageId) {
        return this.storageRepository.deleteStorageById(storageId);
    }
    async updateStorageName(storageId, name) {
        return this.storageRepository.updateStorageName(storageId, name);
    }
};
StorageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(storage_repository_1.StorageRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(nickname_repository_1.NicknameRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(toon_repository_1.ToonRepository)),
    __metadata("design:paramtypes", [storage_repository_1.StorageRepository,
        nickname_repository_1.NicknameRepository,
        toon_repository_1.ToonRepository])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map