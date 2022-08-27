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
exports.responseTagDto = exports.responseTagListDto = exports.responseBannerListDto = exports.responseBannerDto = exports.responseToonDto = exports.responseListDto = exports.responseDto = exports.responseFailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const banner_entity_1 = require("src/entity/banner.entity");
const hashtag_entity_1 = require("src/entity/hashtag.entity");
const nickname_entity_1 = require("src/entity/nickname.entity");
const toon_entity_1 = require("src/entity/toon.entity");
class responseFailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태 코드', default: 'Error Number' }),
    __metadata("design:type", Number)
], responseFailDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '실패', default: false }),
    __metadata("design:type", Boolean)
], responseFailDto.prototype, "ok", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '실패 메시지' }),
    __metadata("design:type", String)
], responseFailDto.prototype, "message", void 0);
exports.responseFailDto = responseFailDto;
class responseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '객체' }),
    __metadata("design:type", nickname_entity_1.Nickname)
], responseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태 코드' }),
    __metadata("design:type", Number)
], responseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공', default: true }),
    __metadata("design:type", Boolean)
], responseDto.prototype, "ok", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 메시지' }),
    __metadata("design:type", String)
], responseDto.prototype, "message", void 0);
exports.responseDto = responseDto;
class responseListDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '인스타툰 리스트', default: [] }),
    __metadata("design:type", Array)
], responseListDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태 코드' }),
    __metadata("design:type", Number)
], responseListDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공', default: true }),
    __metadata("design:type", Boolean)
], responseListDto.prototype, "ok", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 메시지' }),
    __metadata("design:type", String)
], responseListDto.prototype, "message", void 0);
exports.responseListDto = responseListDto;
class responseToonDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '인스타툰 객체' }),
    __metadata("design:type", toon_entity_1.Toon)
], responseToonDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태 코드' }),
    __metadata("design:type", Number)
], responseToonDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공', default: true }),
    __metadata("design:type", Boolean)
], responseToonDto.prototype, "ok", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 메시지' }),
    __metadata("design:type", String)
], responseToonDto.prototype, "message", void 0);
exports.responseToonDto = responseToonDto;
class responseBannerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '배너 객체' }),
    __metadata("design:type", banner_entity_1.Banner)
], responseBannerDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태 코드', default: 201 }),
    __metadata("design:type", Number)
], responseBannerDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공', default: true }),
    __metadata("design:type", Boolean)
], responseBannerDto.prototype, "ok", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 메시지' }),
    __metadata("design:type", String)
], responseBannerDto.prototype, "message", void 0);
exports.responseBannerDto = responseBannerDto;
class responseBannerListDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '배너 리스트', default: [] }),
    __metadata("design:type", Array)
], responseBannerListDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태 코드', default: 200 }),
    __metadata("design:type", Number)
], responseBannerListDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공', default: true }),
    __metadata("design:type", Boolean)
], responseBannerListDto.prototype, "ok", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 메시지' }),
    __metadata("design:type", String)
], responseBannerListDto.prototype, "message", void 0);
exports.responseBannerListDto = responseBannerListDto;
class responseTagListDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '해쉬태그 리스트', default: [] }),
    __metadata("design:type", Array)
], responseTagListDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태 코드', default: 200 }),
    __metadata("design:type", Number)
], responseTagListDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공', default: true }),
    __metadata("design:type", Boolean)
], responseTagListDto.prototype, "ok", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 메시지' }),
    __metadata("design:type", String)
], responseTagListDto.prototype, "message", void 0);
exports.responseTagListDto = responseTagListDto;
class responseTagDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '인스타툰 태그 객체' }),
    __metadata("design:type", hashtag_entity_1.HashTag)
], responseTagDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상태 코드' }),
    __metadata("design:type", Number)
], responseTagDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공', default: true }),
    __metadata("design:type", Boolean)
], responseTagDto.prototype, "ok", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공 메시지' }),
    __metadata("design:type", String)
], responseTagDto.prototype, "message", void 0);
exports.responseTagDto = responseTagDto;
//# sourceMappingURL=globalDTO.js.map