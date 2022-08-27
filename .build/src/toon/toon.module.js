"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToonModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const toon_controller_1 = require("./toon.controller");
const toon_service_1 = require("./toon.service");
const toon_entity_1 = require("../entity/toon.entity");
const banner_entity_1 = require("../entity/banner.entity");
const toonToBanner_entity_1 = require("../entity/toonToBanner.entity");
const hashtag_entity_1 = require("../entity/hashtag.entity");
const toon_repository_1 = require("../repository/toon.repository");
const banner_repository_1 = require("../repository/banner.repository");
const toonToBanner_repository_1 = require("../repository/toonToBanner.repository");
const hashtag_repository_1 = require("../repository/hashtag.repository");
const recommended_entity_1 = require("../entity/recommended.entity");
const bookmark_entity_1 = require("../entity/bookmark.entity");
const bookmark_repository_1 = require("../repository/bookmark.repository");
const recommended_repository_1 = require("../repository/recommended.repository");
let ToonModule = class ToonModule {
};
ToonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                toon_entity_1.Toon,
                banner_entity_1.Banner,
                toonToBanner_entity_1.ToonToBanner,
                hashtag_entity_1.HashTag,
                recommended_entity_1.Recommended,
                bookmark_entity_1.BookMark,
                toon_repository_1.ToonRepository,
                banner_repository_1.BannerRepository,
                toonToBanner_repository_1.ToonToBannerRepository,
                hashtag_repository_1.HashTagRepository,
                bookmark_repository_1.BookMarkRepository,
                recommended_repository_1.RecommnededRepository,
            ]),
        ],
        controllers: [toon_controller_1.ToonController],
        providers: [toon_service_1.ToonService],
    })
], ToonModule);
exports.ToonModule = ToonModule;
//# sourceMappingURL=toon.module.js.map