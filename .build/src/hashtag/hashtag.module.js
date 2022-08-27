"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashtagModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hashtag_entity_1 = require("../entity/hashtag.entity");
const toon_entity_1 = require("../entity/toon.entity");
const hashtag_repository_1 = require("../repository/hashtag.repository");
const toon_repository_1 = require("../repository/toon.repository");
const hashtag_controller_1 = require("./hashtag.controller");
const hashtag_service_1 = require("./hashtag.service");
let HashtagModule = class HashtagModule {
};
HashtagModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                hashtag_entity_1.HashTag,
                toon_entity_1.Toon,
                hashtag_repository_1.HashTagRepository,
                toon_repository_1.ToonRepository,
            ]),
        ],
        controllers: [hashtag_controller_1.HashtagController],
        providers: [hashtag_service_1.HashtagService],
    })
], HashtagModule);
exports.HashtagModule = HashtagModule;
//# sourceMappingURL=hashtag.module.js.map