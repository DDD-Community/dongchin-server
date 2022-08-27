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
exports.BannerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const globalDTO_1 = require("src/api/globalDTO");
const banner_service_1 = require("./banner.service");
const banner_dto_1 = require("./dto/banner.dto");
let BannerController = class BannerController {
    constructor(bannerService) {
        this.bannerService = bannerService;
    }
    createBanner(bannerDto) {
        return this.bannerService.createBanner(bannerDto);
    }
    getAllBanners() {
        return this.bannerService.getAllBanners();
    }
    getAllToonsByRandom() {
        return this.bannerService.getAllToonsByRandom();
    }
    getAllToonsByBanner(id) {
        return this.bannerService.getAllToonsByBanner(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '배너 생성' }),
    (0, swagger_1.ApiBody)({ type: banner_dto_1.BannerDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '배너 생성 성공',
        type: globalDTO_1.responseBannerDto,
    }),
    (0, common_1.Post)('/create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [banner_dto_1.BannerDto]),
    __metadata("design:returntype", void 0)
], BannerController.prototype, "createBanner", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '배너 전체 목록' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '배너 가져오기 실패',
        type: globalDTO_1.responseFailDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '배너 목록 가져오기 성공',
        type: globalDTO_1.responseBannerListDto,
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BannerController.prototype, "getAllBanners", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '랜덤 배너 API' }),
    (0, swagger_1.ApiOkResponse)({
        description: '랜덤 배너의 인스타툰 리스트',
        schema: {
            example: {
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
                                category: '그림체',
                            },
                        ],
                    },
                ],
                statusCode: 200,
                ok: true,
                message: '랜덤으로 툰 가져오기 성공',
            },
        },
    }),
    (0, common_1.Get)('/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BannerController.prototype, "getAllToonsByRandom", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Bannder Id에 따른 인스타툰 목록 가져오기' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '배너 Id를 찾을 수 없습니다.',
        type: globalDTO_1.responseFailDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '배너에 따른 인스타툰 리스트',
        type: globalDTO_1.responseListDto,
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BannerController.prototype, "getAllToonsByBanner", null);
BannerController = __decorate([
    (0, swagger_1.ApiTags)('banners'),
    (0, common_1.Controller)('banners'),
    __metadata("design:paramtypes", [banner_service_1.BannerService])
], BannerController);
exports.BannerController = BannerController;
//# sourceMappingURL=banner.controller.js.map