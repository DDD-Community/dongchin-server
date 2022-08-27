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
exports.ToonToBanner = void 0;
const typeorm_1 = require("typeorm");
const banner_entity_1 = require("./banner.entity");
const toon_entity_1 = require("./toon.entity");
let ToonToBanner = class ToonToBanner {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ToonToBanner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => toon_entity_1.Toon, (toon) => toon.toonToBanners),
    __metadata("design:type", toon_entity_1.Toon)
], ToonToBanner.prototype, "toon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => banner_entity_1.Banner, (banner) => banner.toonToBanners),
    __metadata("design:type", banner_entity_1.Banner)
], ToonToBanner.prototype, "banner", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ToonToBanner.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ToonToBanner.prototype, "updatedAt", void 0);
ToonToBanner = __decorate([
    (0, typeorm_1.Entity)()
], ToonToBanner);
exports.ToonToBanner = ToonToBanner;
//# sourceMappingURL=toonToBanner.entity.js.map