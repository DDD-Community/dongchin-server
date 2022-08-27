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
exports.ToonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const banner_repository_1 = require("src/repository/banner.repository");
const toon_repository_1 = require("../repository/toon.repository");
const toonToBanner_repository_1 = require("src/repository/toonToBanner.repository");
const toonToBanner_entity_1 = require("src/entity/toonToBanner.entity");
const hashtag_repository_1 = require("src/repository/hashtag.repository");
const bookmark_repository_1 = require("src/repository/bookmark.repository");
const recommended_repository_1 = require("src/repository/recommended.repository");
let ToonService = class ToonService {
    constructor(toonRepository, bannerRepository, toonToBanenrRepository, hashTagRepository, bookmarkRepository, recommendedRepository) {
        this.toonRepository = toonRepository;
        this.bannerRepository = bannerRepository;
        this.toonToBanenrRepository = toonToBanenrRepository;
        this.hashTagRepository = hashTagRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.recommendedRepository = recommendedRepository;
    }
    async createToon(toonDto) {
        return this.toonRepository.createToon(toonDto);
    }
    async getAllToons() {
        const query = this.toonRepository.createQueryBuilder('toon');
        const toons = await query.leftJoinAndSelect('toon.tag', 'tag').getMany();
        return Object.assign({
            data: toons,
            statusCode: 200,
            ok: true,
            message: '인스타툰 전체 리스트입니다.',
        });
    }
    async getToonById(id) {
        const query = this.toonRepository.createQueryBuilder('toon');
        const toon = await query
            .innerJoinAndSelect('toon.tag', 'tag')
            .where('toon.id = :id', { id: id })
            .getOne();
        if (!toon)
            throw new common_1.NotFoundException('존재하지 않는 id입니다.');
        return Object.assign({
            data: [toon],
            statusCode: 200,
            ok: true,
            message: '성공',
        });
    }
    async registerToBanner(relationDto) {
        try {
            const banner = await this.bannerRepository.findOne(relationDto.bannerId);
            const toon = await this.toonRepository.findOne(relationDto.toonId);
            const toonToBanner = new toonToBanner_entity_1.ToonToBanner();
            if (!toon || !banner) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: 'id가 존재하지 않습니다.',
                }));
            }
            toonToBanner.banner = banner;
            toonToBanner.toon = toon;
            const result = await this.toonToBanenrRepository.save(toonToBanner);
            return Object.assign({
                data: result,
                statusCode: 201,
                ok: true,
                message: '인스타툰이 배너에 등록되었습니다.',
            });
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
    async registerHashtag(toonHashDto) {
        try {
            const hashTagId = toonHashDto.hashTagIds;
            const toonId = toonHashDto.toonId;
            const toon = await this.toonRepository.findOne(toonId);
            const result = await this.hashTagRepository
                .createQueryBuilder('hashtag')
                .where('hashtag.id IN (:...hashTagId)', { hashTagId })
                .getMany();
            if (!toon || !result) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: 'id가 존재하지 않습니다.',
                }));
            }
            toon.tag = result;
            await this.toonRepository.save(toon);
            return Object.assign({
                data: result,
                statusCode: 201,
                ok: true,
                message: '인스타툰에 태그가 등록되었습니다.',
            });
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
    async getRecentToons() {
        try {
            const toons = await this.toonRepository
                .createQueryBuilder('toon')
                .leftJoinAndSelect('toon.tag', 'tag')
                .orderBy('toon.createAt', 'DESC')
                .take(3)
                .getMany();
            if (!toons) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: '등록된 툰이 없습니다.',
                }));
            }
            return Object.assign({
                data: toons,
                statusCode: 200,
                ok: true,
                message: '최근 등록된 인스타툰 목록',
            });
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
    async makeHeartCount(id, boolType) {
        common_1.Logger.verbose(id, boolType);
        try {
            const toon = await this.toonRepository.findOne(id);
            if (!toon) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: '등록된 툰이 없습니다.',
                }));
            }
            else {
                if (boolType) {
                    toon.likeCount += 1;
                }
                else {
                    if (toon.likeCount >= 1) {
                        toon.likeCount -= 1;
                    }
                }
                await this.toonRepository.save(toon);
            }
            return Object.assign({
                statusCode: 200,
                ok: true,
                message: '성공적으로 작업하였습니다.',
            });
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
    async getPopularList() {
        const toons = await this.toonRepository
            .createQueryBuilder('toon')
            .leftJoinAndSelect('toon.tag', 'tag')
            .orderBy('toon.likeCount', 'DESC')
            .take(6)
            .getMany();
        return Object.assign({
            data: toons,
            statusCode: 200,
            ok: true,
            message: '조회 성공',
        });
    }
    showHtmlRendering(name) {
        return name;
    }
    async addRecommendedWithBookmark(userId, toonId, key) {
        if (key) {
            const recommendResult = await this.recommendedRepository.addRecommended(userId, toonId);
            const bookmarkResult = await this.bookmarkRepository.addBookMark(userId, toonId);
            if (recommendResult === true && bookmarkResult === true) {
                return Object.assign({
                    statusCode: 200,
                    message: '좋아요 및 북마크 추가',
                    success: true,
                });
            }
            else {
                throw new common_1.BadRequestException('이미 좋아요 및 북마크를 등록한 툰입니다.');
            }
        }
        else {
            const recommendResult = await this.recommendedRepository.deleteRecommended(userId, toonId);
            const bookmarkResult = await this.bookmarkRepository.deleteBookMark(userId, toonId);
            if (recommendResult === true && bookmarkResult === true) {
                return Object.assign({
                    statusCode: 200,
                    message: '좋아요 및 북마크 취소',
                    success: true,
                });
            }
            else {
                throw new common_1.BadRequestException('이미 좋아요 및 북마크를 취소된 툰입니다.');
            }
        }
    }
    async getRandomToons() {
        const toons = await this.toonRepository
            .createQueryBuilder('toon')
            .leftJoinAndSelect('toon.tag', 'tag')
            .getMany();
        toons.sort(() => Math.random() - 0.5);
        const randomToons = toons.splice(0, 4);
        return Object.assign({
            data: randomToons,
            statusCode: 200,
            ok: true,
            message: '추천 API 성공',
        });
    }
};
ToonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(toon_repository_1.ToonRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(banner_repository_1.BannerRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(toonToBanner_repository_1.ToonToBannerRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(hashtag_repository_1.HashTagRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(bookmark_repository_1.BookMarkRepository)),
    __param(5, (0, typeorm_1.InjectRepository)(recommended_repository_1.RecommnededRepository)),
    __metadata("design:paramtypes", [toon_repository_1.ToonRepository,
        banner_repository_1.BannerRepository,
        toonToBanner_repository_1.ToonToBannerRepository,
        hashtag_repository_1.HashTagRepository,
        bookmark_repository_1.BookMarkRepository,
        recommended_repository_1.RecommnededRepository])
], ToonService);
exports.ToonService = ToonService;
//# sourceMappingURL=toon.service.js.map