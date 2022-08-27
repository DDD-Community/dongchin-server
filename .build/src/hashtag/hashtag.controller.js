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
exports.HashtagController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const globalDTO_1 = require("src/api/globalDTO");
const hashtag_create_dto_1 = require("./dto/hashtag-create.dto");
const hashtag_service_1 = require("./hashtag.service");
let HashtagController = class HashtagController {
    constructor(hashTagService) {
        this.hashTagService = hashTagService;
    }
    createHasgtag(hashTagDto) {
        return this.hashTagService.createHashtag(hashTagDto);
    }
    getAllTags() {
        return this.hashTagService.getAllTags();
    }
    getPopularKeyWords() {
        return this.hashTagService.getPopularKeyWords();
    }
    getSearchKeyWord(tagName) {
        return this.hashTagService.getSearchKeyWord(tagName);
    }
    getTopicKeyWord() {
        return this.hashTagService.getTopicKeyWord();
    }
    getDrawStyleKeyWord() {
        return this.hashTagService.getDrawStyleKeyWord();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '태그 생성' }),
    (0, swagger_1.ApiBody)({ type: hashtag_create_dto_1.HashTagDto }),
    (0, swagger_1.ApiCreatedResponse)({
        status: 201,
        description: '성공',
        type: globalDTO_1.responseTagDto,
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
    __metadata("design:paramtypes", [hashtag_create_dto_1.HashTagDto]),
    __metadata("design:returntype", Promise)
], HashtagController.prototype, "createHasgtag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '태그 전체 목록' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '태그 가져오기 실패',
        type: globalDTO_1.responseFailDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '태그 목록 가져오기 성공',
        type: globalDTO_1.responseTagListDto,
    }),
    (0, common_1.Get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HashtagController.prototype, "getAllTags", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '인기 검색태그 API' }),
    (0, swagger_1.ApiOkResponse)({
        description: '인기 검색태그 가져오기 성공',
        type: globalDTO_1.responseTagListDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '인기 검색태그 가져오기 실패',
        type: globalDTO_1.responseFailDto,
    }),
    (0, common_1.Get)('/popular-keyword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HashtagController.prototype, "getPopularKeyWords", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '태그 검색 API: 키워드에 따른 인툰 list' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '검색 키워드에 따른 인툰리스트 가져오기 실패',
        type: globalDTO_1.responseFailDto,
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('tagName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HashtagController.prototype, "getSearchKeyWord", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주제 키워드 태그 목록 API' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '주제 키워드 가져오기 실패',
        type: globalDTO_1.responseFailDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '태그 목록 가져오기 성공',
        type: globalDTO_1.responseTagListDto,
    }),
    (0, common_1.Get)('/topic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HashtagController.prototype, "getTopicKeyWord", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '그림체 키워드 태그 목록 API' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '그림체 키워드 가져오기 실패',
        type: globalDTO_1.responseFailDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '태그 목록 가져오기 성공',
        type: globalDTO_1.responseTagListDto,
    }),
    (0, common_1.Get)('/draw-style'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HashtagController.prototype, "getDrawStyleKeyWord", null);
HashtagController = __decorate([
    (0, swagger_1.ApiTags)('hashtags'),
    (0, common_1.Controller)('hashtags'),
    __metadata("design:paramtypes", [hashtag_service_1.HashtagService])
], HashtagController);
exports.HashtagController = HashtagController;
//# sourceMappingURL=hashtag.controller.js.map