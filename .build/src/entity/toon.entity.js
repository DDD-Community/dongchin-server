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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toon = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const hashtag_entity_1 = require("./hashtag.entity");
const toonToBanner_entity_1 = require("./toonToBanner.entity");
let Toon = class Toon {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'primary key', default: 1 }),
    __metadata("design:type", Number)
], Toon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '작가 이름' }),
    __metadata("design:type", String)
], Toon.prototype, "authorName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '인스타그램 ID' }),
    __metadata("design:type", String)
], Toon.prototype, "instagramId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '설명' }),
    __metadata("design:type", String)
], Toon.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '이미지 url' }),
    __metadata("design:type", String)
], Toon.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => hashtag_entity_1.HashTag),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Toon.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '인스타그램 연결 link' }),
    __metadata("design:type", String)
], Toon.prototype, "instagramUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'link' }),
    (0, swagger_1.ApiProperty)({ description: '인스타그램 html link' }),
    __metadata("design:type", String)
], Toon.prototype, "htmlUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, swagger_1.ApiProperty)({ description: '하트/좋아요 수' }),
    __metadata("design:type", Number)
], Toon.prototype, "likeCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => toonToBanner_entity_1.ToonToBanner, (toonToBanner) => toonToBanner.toon),
    __metadata("design:type", Array)
], Toon.prototype, "toonToBanners", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: 'NOW()' }),
    __metadata("design:type", Date)
], Toon.prototype, "createAt", void 0);
Toon = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['instagramUrl'])
], Toon);
exports.Toon = Toon;
//# sourceMappingURL=toon.entity.js.map