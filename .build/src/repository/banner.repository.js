"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const banner_entity_1 = require("../entity/banner.entity");
let BannerRepository = class BannerRepository extends typeorm_1.Repository {
    async createBanner(bannerDto) {
        const { name } = bannerDto;
        const banner = this.create({ name });
        try {
            await this.save(banner);
            common_1.Logger.verbose('banner', JSON.stringify(banner));
            return Object.assign({
                data: banner,
                statusCode: 201,
                ok: true,
                message: '배너 생성 성공',
            });
        }
        catch (error) {
            common_1.Logger.verbose('code', error.code);
        }
    }
};
BannerRepository = __decorate([
    (0, typeorm_1.EntityRepository)(banner_entity_1.Banner)
], BannerRepository);
exports.BannerRepository = BannerRepository;
//# sourceMappingURL=banner.repository.js.map