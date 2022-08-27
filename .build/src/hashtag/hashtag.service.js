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
exports.HashtagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hashtag_repository_1 = require("src/repository/hashtag.repository");
const toon_repository_1 = require("src/repository/toon.repository");
let HashtagService = class HashtagService {
    constructor(hashTagRepository, toonRepository) {
        this.hashTagRepository = hashTagRepository;
        this.toonRepository = toonRepository;
    }
    async createHashtag(hashTagDto) {
        return this.hashTagRepository.createHashtag(hashTagDto);
    }
    async getAllTags() {
        try {
            const query = this.hashTagRepository.createQueryBuilder('hashtag');
            const hashtags = await query.getMany();
            if (!hashtags)
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: '태그 목록이 없습니다.',
                }));
            return Object.assign({
                data: hashtags,
                statusCode: 200,
                ok: true,
                message: '태그 목록 조회 성공',
            });
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
    async getPopularKeyWords() {
        try {
            const hashtags = await this.hashTagRepository
                .createQueryBuilder('hashtag')
                .orderBy('hashtag.count', 'DESC')
                .limit(10)
                .getMany();
            if (!hashtags) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: '해쉬 태그가 존재하지 않습니다.',
                }));
            }
            return Object.assign({
                data: hashtags,
                statusCode: 200,
                ok: true,
                message: '인기 검색 키워드',
            });
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
    async getSearchKeyWord(tagName) {
        try {
            const hashtag = await this.hashTagRepository
                .createQueryBuilder('hashtag')
                .where('hashtag.title = :title', { title: tagName })
                .getOne();
            const toons = await this.toonRepository
                .createQueryBuilder('toon')
                .select('toon', 'toon.tag')
                .innerJoinAndSelect('toon.tag', 'tag')
                .getMany();
            const result = [];
            if (!toons)
                return result;
            toons.forEach((toon) => {
                toon.tag.forEach((tag) => {
                    if (tag.title === hashtag.title) {
                        result.push(toon);
                    }
                });
            });
            if (!hashtag || result.length === 0) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: '해쉬 태그가 존재하지 않거나 태그에 따른 toon이 없습니다.',
                }));
            }
            hashtag.count += 1;
            await this.hashTagRepository.save(hashtag);
            return result;
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
    async getTopicKeyWord() {
        try {
            const tags = await this.hashTagRepository
                .createQueryBuilder('hashtag')
                .where('hashtag.category = :category', { category: '주제' })
                .getMany();
            if (!tags) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: '주제 키워드가 존재하지 않습니다.',
                }));
            }
            return Object.assign({
                data: tags,
                statusCode: 200,
                ok: true,
                message: '주제 키워드 list',
            });
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
    async getDrawStyleKeyWord() {
        try {
            const tags = await this.hashTagRepository
                .createQueryBuilder('hashtag')
                .where('hashtag.category = :category', { category: '그림체' })
                .getMany();
            if (!tags) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: '그림체 키워드가 존재하지 않습니다.',
                }));
            }
            return Object.assign({
                data: tags,
                statusCode: 200,
                ok: true,
                message: '그림체 키워드 list',
            });
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
};
HashtagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hashtag_repository_1.HashTagRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(toon_repository_1.ToonRepository)),
    __metadata("design:paramtypes", [hashtag_repository_1.HashTagRepository,
        toon_repository_1.ToonRepository])
], HashtagService);
exports.HashtagService = HashtagService;
//# sourceMappingURL=hashtag.service.js.map