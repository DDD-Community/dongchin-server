"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashTagRepository = void 0;
const common_1 = require("@nestjs/common");
const hashtag_entity_1 = require("../entity/hashtag.entity");
const typeorm_1 = require("typeorm");
let HashTagRepository = class HashTagRepository extends typeorm_1.Repository {
    async createHashtag(hashTagDto) {
        const { title, category } = hashTagDto;
        if (category === '주제' || category === '그림체') {
            const tag = this.create({ title, category });
            try {
                const result = await this.save(tag);
                return Object.assign({
                    data: result,
                    statusCode: 201,
                    ok: true,
                    message: '태그가 등록되었습니다.',
                });
            }
            catch (error) {
                common_1.Logger.verbose('error code', error.code);
                throw new common_1.BadRequestException(Object.assign({
                    statusCode: 400,
                    ok: false,
                    message: 'url이 중복됩니다.',
                }));
            }
        }
        else {
            return Object.assign({
                statusCode: 400,
                ok: false,
                message: "카테고리 입력을 '주제' 또는 '그림체'로 입력하세요",
            });
        }
    }
};
HashTagRepository = __decorate([
    (0, typeorm_1.EntityRepository)(hashtag_entity_1.HashTag)
], HashTagRepository);
exports.HashTagRepository = HashTagRepository;
//# sourceMappingURL=hashtag.repository.js.map