"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommnededRepository = void 0;
const recommended_entity_1 = require("../entity/recommended.entity");
const typeorm_1 = require("typeorm");
let RecommnededRepository = class RecommnededRepository extends typeorm_1.Repository {
    async addRecommended(userId, toonId) {
        const result = await this.createQueryBuilder('recommended')
            .where('recommended.userId = :userId', { userId: userId })
            .andWhere('recommended.toonId = :toonId', { toonId: toonId })
            .getOne();
        if (!result) {
            const data = this.create({ userId: userId, toonId: toonId });
            await this.save(data);
            return true;
        }
        else {
            return false;
        }
    }
    async deleteRecommended(userId, toonId) {
        const result = await this.createQueryBuilder('recommended')
            .where('recommended.userId = :userId', { userId: userId })
            .andWhere('recommended.toonId = :toonId', { toonId: toonId })
            .getOne();
        if (!result) {
            return false;
        }
        else {
            await this.delete(result);
            return true;
        }
    }
};
RecommnededRepository = __decorate([
    (0, typeorm_1.EntityRepository)(recommended_entity_1.Recommended)
], RecommnededRepository);
exports.RecommnededRepository = RecommnededRepository;
//# sourceMappingURL=recommended.repository.js.map