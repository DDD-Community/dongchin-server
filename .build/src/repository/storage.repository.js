"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageRepository = void 0;
const common_1 = require("@nestjs/common");
const storage_entity_1 = require("../entity/storage.entity");
const storage_list_dto_1 = require("../storage/dto/storage-list.dto");
const typeorm_1 = require("typeorm");
let StorageRepository = class StorageRepository extends typeorm_1.Repository {
    async createStorage(nicknameRepository, name, nickName) {
        const nickname = await nicknameRepository.findOne({
            nickName: nickName,
        });
        if (!nickname) {
            throw new common_1.NotFoundException('nickname을 찾을 수 없습니다.');
        }
        else {
            const storage = this.create({ name: name });
            storage.save(nickname);
            await this.save(storage);
            return Object.assign({
                statusCode: 201,
                ok: true,
                message: '보관함이 생성되었습니다.',
            });
        }
    }
    async getStorageByNickname(nicknameRepository, nickName) {
        const storageDetails = [];
        const result = await nicknameRepository
            .createQueryBuilder('nickname')
            .select('nickname.nickName')
            .leftJoinAndSelect('nickname.storages', 'storage')
            .leftJoinAndSelect('storage.toons', 'toon')
            .andWhere('nickname.nickName = :nickname', { nickname: nickName })
            .getOne();
        const length = Object.keys(result.storages).length;
        for (let i = 0; i < length; i++) {
            const toonsLength = Object.keys(result.storages[i].toons).length;
            const storageName = result.storages[i].name;
            const storageId = result.storages[i].storageId;
            const toonImg = toonsLength ? result.storages[i].toons[0].imgUrl : ' ';
            storageDetails.push(new storage_list_dto_1.StorageDetailDto(storageName, storageId, toonImg, toonsLength));
        }
        return Object.assign({
            data: storageDetails,
            statusCode: 200,
            ok: true,
            message: '보관함이 조회 성공.',
        });
    }
    async addToonByStorageId(toonRepository, storageId, toonId) {
        const storage = await this.findOne({ storageId: storageId });
        const toon = await toonRepository.findOne({ id: toonId });
        if (!storage || !toon) {
            throw new common_1.NotFoundException('Id를 찾을 수 없습니다.');
        }
        const toons = storage.toons;
        console.log(toons);
        if (toons.length === 0) {
            storage.toons = [toon];
            await this.save(storage);
            return Object.assign({
                statusCode: 200,
                ok: true,
                message: '보관함에 인스타툰 추가 성공',
            });
        }
        else {
            toons.push(toon);
            storage.toons = toons;
            await this.save(storage);
            return Object.assign({
                statusCode: 200,
                ok: true,
                message: '보관함에 인스타툰 추가 성공',
            });
        }
    }
    async getToonsByStorageId(id) {
        const toons = await this.createQueryBuilder('storage')
            .leftJoinAndSelect('storage.toons', 'toon')
            .leftJoinAndSelect('toon.tag', 'tag')
            .andWhere('storage.storageId = :id', { id: id })
            .getMany();
        if (toons.length == 0)
            throw new common_1.NotFoundException('찾을 수 없는 storageId입니다.');
        return Object.assign({
            data: toons,
            statusCode: 200,
            ok: true,
            message: '조회 성공',
        });
    }
    async deleteToonsByStorageId(id, toonsIdDto) {
        const storage = await this.findOne({ storageId: id });
        const toons = storage.toons;
        const { toonsIdArray } = toonsIdDto;
        if (!storage)
            throw new common_1.NotFoundException('storageId가 존재하지 않습니다.');
        for (let i = 0; i < toonsIdArray.length; i++) {
            for (let j = 0; j < toons.length; j++) {
                if (toonsIdArray[i] === toons[j].id) {
                    toons.splice(j, 1);
                }
            }
        }
        storage.toons = toons;
        await this.save(storage);
        return Object.assign({
            statusCode: 200,
            ok: true,
            message: '성공',
        });
    }
    async deleteStorageById(storageId) {
        const result = await this.delete({ storageId: storageId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('잘못된 storageId입니다.');
        }
        else {
            return Object.assign({
                statusCode: 200,
                success: true,
                message: '보관함이 삭제되었습니다.',
            });
        }
    }
    async updateStorageName(storageId, name) {
        const storage = await this.findOne({ storageId: storageId });
        if (!storage) {
            throw new common_1.NotFoundException('잘못된 storageId로 찾을 수 없습니다.');
        }
        else {
            storage.name = name;
            await this.save(storage);
            return Object.assign({
                statusCode: 200,
                ok: true,
                message: '보관함 이름이 변경되었습니다.',
            });
        }
    }
};
StorageRepository = __decorate([
    (0, typeorm_1.EntityRepository)(storage_entity_1.Storage)
], StorageRepository);
exports.StorageRepository = StorageRepository;
//# sourceMappingURL=storage.repository.js.map