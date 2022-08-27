"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookMarkRepository = void 0;
const bookmark_entity_1 = require("src/entity/bookmark.entity");
const typeorm_1 = require("typeorm");
let BookMarkRepository = class BookMarkRepository extends typeorm_1.Repository {
    async addBookMark(userId, toonId) {
        const result = await this.createQueryBuilder('bookmark')
            .where('bookmark.userId = :userId', { userId: userId })
            .andWhere('bookmark.toonId = :toonId', { toonId: toonId })
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
    async deleteBookMark(userId, toonId) {
        const result = await this.createQueryBuilder('bookmark')
            .where('bookmark.userId = :userId', { userId: userId })
            .andWhere('bookmark.toonId = :toonId', { toonId: toonId })
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
BookMarkRepository = __decorate([
    (0, typeorm_1.EntityRepository)(bookmark_entity_1.BookMark)
], BookMarkRepository);
exports.BookMarkRepository = BookMarkRepository;
//# sourceMappingURL=bookmark.repository.js.map