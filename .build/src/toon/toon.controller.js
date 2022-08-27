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
exports.ToonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const globalDTO_1 = require("src/api/globalDTO");
const relation_dto_1 = require("./dto/relation.dto");
const toon_create_dto_1 = require("./dto/toon-create.dto");
const toon_hashtag_dto_1 = require("./dto/toon-hashtag.dto");
const toon_service_1 = require("./toon.service");
let ToonController = class ToonController {
    constructor(toonService) {
        this.toonService = toonService;
    }
    showHtmlRendering(name, res) {
        return res.render(this.toonService.showHtmlRendering(name));
    }
    getRecentToons() {
        return this.toonService.getRecentToons();
    }
    getPopularList() {
        return this.toonService.getPopularList();
    }
    addRecommendedWithBookmark(userId, toonId, key) {
        return this.toonService.addRecommendedWithBookmark(userId, toonId, key);
    }
    getAllToons() {
        return this.toonService.getAllToons();
    }
    getRandomToons() {
        return this.toonService.getRandomToons();
    }
    getToonById(id) {
        return this.toonService.getToonById(id);
    }
    makeHeartCount(id, boolType) {
        return this.toonService.makeHeartCount(id, boolType);
    }
    createToon(toonDto) {
        return this.toonService.createToon(toonDto);
    }
    registerToBanner(relationDto) {
        return this.toonService.registerToBanner(relationDto);
    }
    registerHashtag(toonHashDto) {
        return this.toonService.registerHashtag(toonHashDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'html render API',
    }),
    (0, common_1.Get)('/page'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ToonController.prototype, "showHtmlRendering", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '새롭게 등록된 툰 API' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공', type: globalDTO_1.responseListDto }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: 404,
        description: '툰이 존재하지 않음',
        type: globalDTO_1.responseFailDto,
    }),
    (0, common_1.Get)('/recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToonController.prototype, "getRecentToons", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '실시간 인기툰 API' }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        schema: {
            example: Object.assign({
                data: [
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
                        tag: [
                            {
                                id: 5,
                                title: '드로잉',
                                count: 2,
                                category: 'drawing',
                            },
                        ],
                    },
                ],
                statusCode: 200,
                ok: true,
                message: '조회 성공',
            }),
        },
    }),
    (0, common_1.Get)('/popular-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToonController.prototype, "getPopularList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '유저마다 좋아요 누른 툰과 북마크 툰 등록 API / 등록: key = true 등록 취소: key = false',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '좋아요 및 북마크 추가 또는 취소',
                success: true,
            },
        },
    }),
    (0, common_1.Get)('isLikeBookmark'),
    __param(0, (0, common_1.Query)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('toonId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('key', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean]),
    __metadata("design:returntype", void 0)
], ToonController.prototype, "addRecommendedWithBookmark", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '인스타툰 목록' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공', type: globalDTO_1.responseListDto }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToonController.prototype, "getAllToons", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '추천툰 API' }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        schema: {
            example: {
                data: [],
                statusCode: 200,
                ok: true,
                message: '추천 API 성공',
            },
        },
    }),
    (0, common_1.Get)('/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToonController.prototype, "getRandomToons", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '서버에서 지정한 id에 따른 인툰 정보' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: Object.assign({
                data: [
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
                        tag: [
                            {
                                id: 5,
                                title: '드로잉',
                                count: 2,
                                category: 'drawing',
                            },
                        ],
                    },
                ],
                statusCode: 200,
                ok: true,
                message: '성공',
            }),
        },
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ToonController.prototype, "getToonById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '인스타툰 작품에 좋아요/하트 API count수 증가: key=true 감소: key=false',
    }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('key', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], ToonController.prototype, "makeHeartCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '인스타툰 링크생성' }),
    (0, swagger_1.ApiBody)({ type: toon_create_dto_1.ToonDto }),
    (0, swagger_1.ApiCreatedResponse)({
        status: 201,
        description: '성공',
        type: globalDTO_1.responseToonDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '중복된 URL',
        type: globalDTO_1.responseFailDto,
    }),
    (0, common_1.Post)('/create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [toon_create_dto_1.ToonDto]),
    __metadata("design:returntype", Promise)
], ToonController.prototype, "createToon", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '인스타툰 배너에 등록하기' }),
    (0, swagger_1.ApiCreatedResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, type: globalDTO_1.responseFailDto }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)('/banner'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relation_dto_1.RelationDto]),
    __metadata("design:returntype", Promise)
], ToonController.prototype, "registerToBanner", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '인스타툰에 태그 등록하기' }),
    (0, swagger_1.ApiCreatedResponse)({ status: 201, description: '성공' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, type: globalDTO_1.responseFailDto }),
    (0, swagger_1.ApiBody)({ type: toon_hashtag_dto_1.ToonHashTagDto }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)('/hashtag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [toon_hashtag_dto_1.ToonHashTagDto]),
    __metadata("design:returntype", Promise)
], ToonController.prototype, "registerHashtag", null);
ToonController = __decorate([
    (0, swagger_1.ApiTags)('toons'),
    (0, common_1.Controller)('toons'),
    __metadata("design:paramtypes", [toon_service_1.ToonService])
], ToonController);
exports.ToonController = ToonController;
//# sourceMappingURL=toon.controller.js.map