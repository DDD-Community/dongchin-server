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
exports.Storage = void 0;
const typeorm_1 = require("typeorm");
const nickname_entity_1 = require("./nickname.entity");
const toon_entity_1 = require("./toon.entity");
let Storage = class Storage {
    save(nickname) {
        this.nickname = nickname;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Storage.prototype, "storageId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Storage.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nickname_entity_1.Nickname, (nickname) => nickname.storages),
    __metadata("design:type", nickname_entity_1.Nickname)
], Storage.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => toon_entity_1.Toon, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Storage.prototype, "toons", void 0);
Storage = __decorate([
    (0, typeorm_1.Entity)()
], Storage);
exports.Storage = Storage;
//# sourceMappingURL=storage.entity.js.map