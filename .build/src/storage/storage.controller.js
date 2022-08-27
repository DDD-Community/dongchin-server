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
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const storage_create_dto_1 = require("./dto/storage-create.dto");
const storage_toon_dto_1 = require("./dto/storage-toon.dto");
const toon_list_dto_1 = require("./dto/toon-list.dto");
const storage_service_1 = require("./storage.service");
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    createStorage(storageCreateDto) {
        const { name, nickName } = storageCreateDto;
        return this.storageService.createStorage(name, nickName);
    }
    addToonByStorageId(storageToonDto) {
        const { storageId, toonId } = storageToonDto;
        return this.storageService.addToonByStorageId(storageId, toonId);
    }
    getStorageByNickname(nickName) {
        return this.storageService.getStorageByNickname(nickName);
    }
    getToonsByStorageId(id) {
        return this.storageService.getToonsByStorageId(id);
    }
    deleteStorageById(storageId) {
        return this.storageService.deleteStorageById(storageId);
    }
    deleteToonsByStorageId(id, toonsIdDto) {
        return this.storageService.deleteToonsByStorageId(id, toonsIdDto);
    }
    updateStorageName(storageId, name) {
        return this.storageService.updateStorageName(storageId, name);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '보관함 생성 API' }),
    (0, swagger_1.ApiBody)({ type: storage_create_dto_1.StorageDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        schema: {
            example: Object.assign({
                statusCode: 201,
                ok: true,
                message: '보관함이 생성되었습니다.',
            }),
        },
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [storage_create_dto_1.StorageDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "createStorage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '보관함 id에 toon 추가' }),
    (0, swagger_1.ApiBody)({ type: storage_toon_dto_1.StorageToonDto }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        schema: {
            example: Object.assign({
                statusCode: 200,
                ok: true,
                message: '보관함에 인스타툰 추가 성공',
            }),
        },
    }),
    (0, common_1.Post)('/toon'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [storage_toon_dto_1.StorageToonDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "addToonByStorageId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '보관함 조회 API' }),
    (0, swagger_1.ApiResponse)({
        schema: {
            example: Object.assign({
                data: [
                    {
                        storageName: '기본 보관함',
                        storageId: 2,
                        toonImg: 'https://user-images.githubusercontent.com/52276038/177170605-dc8cecbe-fdcf-4252-a908-d829992c4c30.png',
                        count: 2,
                    },
                    {
                        storageName: '연애 보관함',
                        storageId: 3,
                        toonImg: ' ',
                        count: 0,
                    },
                    {
                        storageName: '랜덤 보관함',
                        storageId: 4,
                        toonImg: ' ',
                        count: 0,
                    },
                ],
                statusCode: 200,
                ok: true,
                message: '조회 성공',
            }),
        },
    }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('nickName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "getStorageByNickname", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '보관함 상세 조회 API' }),
    (0, swagger_1.ApiResponse)({
        schema: {
            example: {
                data: {
                    storageId: 1,
                    name: '기본 보관함',
                    toons: [
                        {
                            id: 10,
                            authorName: '현이',
                            instagramId: 'hyuny_beeny',
                            description: '하고 싶은게 많은 시각디자인과 미대생 현이의 일상',
                            imgUrl: 'https://user-images.githubusercontent.com/52276038/177171189-c8f546fd-4865-4480-b438-bf026f6e4e1c.png',
                            instagramUrl: 'https://instagram.com/hyuny_bee',
                            htmlUrl: 'http://my-app-elb-251560380.ap-northeast-2.elb.amazonaws.com/toons/page?name=hyuny_beeny',
                            likeCount: 0,
                            createAt: '2022-07-08T04:02:00.597Z',
                        },
                        {
                            id: 9,
                            authorName: '펜낙',
                            instagramId: 'pennac2016',
                            description: '포롱이와 호롱이의 달콤살벌 연애 스토리',
                            imgUrl: 'https://user-images.githubusercontent.com/52276038/177170605-dc8cecbe-fdcf-4252-a908-d829992c4c30.png',
                            instagramUrl: 'https://instagram.com/pennac2016',
                            htmlUrl: 'http://my-app-elb-251560380.ap-northeast-2.elb.amazonaws.com/toons/page?name=pennac2016',
                            likeCount: 5,
                            createAt: '2022-07-08T03:54:00.143Z',
                        },
                    ],
                },
                statusCode: 200,
                ok: true,
                message: '조회 성공',
            },
        },
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "getToonsByStorageId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '보관함 삭제 API' }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        schema: {
            example: Object.assign({
                statusCode: 200,
                success: true,
                message: '보관함이 삭제되었습니다.',
            }),
        },
    }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('storageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "deleteStorageById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '보관함에 들어있는 인스타툰 삭제 API' }),
    (0, swagger_1.ApiBody)({ type: toon_list_dto_1.ToonsListDto }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        schema: {
            example: Object.assign({ statusCode: 200, ok: true, message: '성공' }),
        },
    }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, toon_list_dto_1.ToonsListDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "deleteToonsByStorageId", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        schema: {
            example: {
                statusCode: 200,
                ok: true,
                message: '보관함 이름이 변경되었습니다.',
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: '보관함 이름 편집 API' }),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Query)('storageId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "updateStorageName", null);
StorageController = __decorate([
    (0, swagger_1.ApiTags)('storages'),
    (0, common_1.Controller)('storages'),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
exports.StorageController = StorageController;
//# sourceMappingURL=storage.controller.js.map