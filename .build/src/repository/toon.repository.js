"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToonRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const toon_entity_1 = require("../entity/toon.entity");
let ToonRepository = class ToonRepository extends typeorm_1.Repository {
    async createToon(toonDto) {
        const instaToon = this.create(toonDto);
        try {
            const result = await this.save(instaToon);
            return Object.assign({
                data: result,
                statusCode: 201,
                ok: true,
                message: '인스타툰이 등록되었습니다.',
            });
        }
        catch (error) {
            common_1.Logger.verbose('error code', error.code);
            if (error.code === '23502') {
                throw new common_1.BadRequestException('column 에 추가적인 값이 필요합니다.');
            }
            throw new common_1.BadRequestException(Object.assign({
                statusCode: 400,
                ok: false,
                message: 'url이 중복됩니다.',
            }));
        }
    }
};
ToonRepository = __decorate([
    (0, typeorm_1.EntityRepository)(toon_entity_1.Toon)
], ToonRepository);
exports.ToonRepository = ToonRepository;
//# sourceMappingURL=toon.repository.js.map