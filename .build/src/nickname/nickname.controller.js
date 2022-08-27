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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NicknameController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const globalDTO_1 = require("src/api/globalDTO");
const nickname_credential_dto_1 = require("./dto/nickname-credential.dto");
const nickname_service_1 = require("./nickname.service");
let NicknameController = class NicknameController {
    constructor(nicknameService) {
        this.nicknameService = nicknameService;
    }
    updateNickName(id, nicknameCredentialDto) {
        return this.nicknameService.updateNickName(id, nicknameCredentialDto);
    }
    createNickName(nicknameCredentialDto) {
        return this.nicknameService.createNickName(nicknameCredentialDto);
    }
    checkValidation(nickName) {
        return this.nicknameService.checkValidation(nickName);
    }
    deleteById(nickName) {
        return this.nicknameService.deleteBynickName(nickName);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '닉네임 수정 API' }),
    (0, swagger_1.ApiBody)({ type: nickname_credential_dto_1.NickNameCredentialDto }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '닉네임 변경 실패: 찾을 수 없는 id',
        type: globalDTO_1.responseFailDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: 401,
        description: '닉네임의 id는 존재하지만 변경하려는 닉네임이 중복',
        type: globalDTO_1.responseFailDto,
    }),
    (0, swagger_1.ApiOkResponse)({ description: '닉네임 변경 성공', type: globalDTO_1.responseDto }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nickname_credential_dto_1.NickNameCredentialDto]),
    __metadata("design:returntype", Promise)
], NicknameController.prototype, "updateNickName", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '닉네임 생성 API' }),
    (0, swagger_1.ApiBody)({ type: nickname_credential_dto_1.NickNameCredentialDto }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: 400,
        description: 'JSON KEY 이름이 잘못되었을 가능성',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '실패: 중복된 닉네임',
        type: globalDTO_1.responseFailDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({ status: 201, description: '성공', type: globalDTO_1.responseDto }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nickname_credential_dto_1.NickNameCredentialDto]),
    __metadata("design:returntype", Promise)
], NicknameController.prototype, "createNickName", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '닉네임 중복체크 API' }),
    (0, swagger_1.ApiOkResponse)({ description: '닉네임 중복 체크' }),
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Query)('nickName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NicknameController.prototype, "checkValidation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '닉네임 삭제 API' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '실패: 찾을 수 없는 닉네임의 id',
        schema: {
            example: {
                statusCode: 404,
                ok: false,
                message: '닉네임을 찾을 수 없습니다.',
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        description: '성공: 닉네임 삭제 성공',
        schema: {
            example: {
                statusCode: 200,
                ok: true,
                message: '닉네임이 삭제되었습니다.',
            },
        },
    }),
    (0, common_1.Delete)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Query)('nickName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NicknameController.prototype, "deleteById", null);
NicknameController = __decorate([
    (0, swagger_1.ApiTags)('nicknames'),
    (0, common_1.Controller)('nicknames'),
    __metadata("design:paramtypes", [nickname_service_1.NicknameService])
], NicknameController);
exports.NicknameController = NicknameController;
//# sourceMappingURL=nickname.controller.js.map