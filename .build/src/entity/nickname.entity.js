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
exports.Nickname = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const storage_entity_1 = require("./storage.entity");
let Nickname = class Nickname {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'id값', default: 1 }),
    __metadata("design:type", Number)
], Nickname.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '닉네임', default: 'yong' }),
    __metadata("design:type", String)
], Nickname.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => storage_entity_1.Storage, (storage) => storage.nickname, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", storage_entity_1.Storage)
], Nickname.prototype, "storages", void 0);
Nickname = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['nickName'])
], Nickname);
exports.Nickname = Nickname;
//# sourceMappingURL=nickname.entity.js.map