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
exports.NicknameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nickName_config_1 = require("./constant/nickName.config");
const nickname_entity_1 = require("../entity/nickname.entity");
const nickname_repository_1 = require("../repository/nickname.repository");
const storage_repository_1 = require("../repository/storage.repository");
let NicknameService = class NicknameService {
    constructor(nickNameRepository, storageRepository) {
        this.nickNameRepository = nickNameRepository;
        this.storageRepository = storageRepository;
        this.FAIL_DELETE = 0;
    }
    async createNickName(nicknameCredentialDto) {
        return this.nickNameRepository.createNickName(nicknameCredentialDto, this.storageRepository);
    }
    async getNickNameById(id) {
        const user = await this.nickNameRepository.findOne(id);
        if (!user || !id) {
            const notNickname = new nickname_entity_1.Nickname();
            notNickname.id = id;
            notNickname.nickName = nickName_config_1.Config.NOT_FOUND_NICKNAME;
            return notNickname;
        }
        common_1.Logger.verbose('user', JSON.stringify(user));
        return user;
    }
    async checkValidation(nickName) {
        try {
            const user = await this.nickNameRepository
                .createQueryBuilder('nickname')
                .where('nickname.nickName = :nickName', { nickName })
                .getOne();
            if (user === undefined) {
                return Object.assign({
                    statusCode: 200,
                    ok: true,
                    message: '닉네임 사용이 가능합니다.',
                });
            }
            else {
                return Object.assign({
                    statusCode: 200,
                    ok: false,
                    message: '닉네임 사용이 불가능합니다.',
                });
            }
        }
        catch (error) {
            common_1.Logger.verbose('error', error);
        }
    }
    async updateNickName(id, nicknameCredentialDto) {
        const user = await this.getNickNameById(id);
        common_1.Logger.verbose('user', JSON.stringify(user));
        try {
            const user = await this.getNickNameById(id);
            common_1.Logger.verbose('user', JSON.stringify(user));
            if (user.nickName === nickName_config_1.Config.NOT_FOUND_NICKNAME) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: 'id가 존재하지 않습니다.',
                }));
            }
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
        user.nickName = nicknameCredentialDto.nickName;
        try {
            const result = await this.nickNameRepository.save(user);
            common_1.Logger.verbose('user', JSON.stringify(result));
            return Object.assign({
                data: result,
                statusCode: 200,
                ok: true,
                message: '닉네임이 변경되었습니다.',
            });
        }
        catch (error) {
            if (error.code === nickName_config_1.Config.OVERLAP_ERROR_CODE) {
                throw new common_1.BadRequestException(Object.assign({
                    statusCode: 400,
                    ok: false,
                    message: '변경하려는 닉네임이 중복됩니다.',
                }));
            }
        }
    }
    async deleteBynickName(nickName) {
        try {
            const result = await this.nickNameRepository
                .createQueryBuilder()
                .delete()
                .from(nickname_entity_1.Nickname)
                .where('nickName = :nickName', { nickName: nickName })
                .execute();
            if (result.affected === this.FAIL_DELETE) {
                throw new common_1.NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: '닉네임을 찾을 수 없습니다.',
                }));
            }
            else {
                return Object.assign({
                    statusCode: 200,
                    ok: true,
                    message: '닉네임이 삭제되었습니다.',
                });
            }
        }
        catch (NotFoundException) {
            throw NotFoundException;
        }
    }
};
NicknameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nickname_repository_1.NicknameRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(storage_repository_1.StorageRepository)),
    __metadata("design:paramtypes", [nickname_repository_1.NicknameRepository,
        storage_repository_1.StorageRepository])
], NicknameService);
exports.NicknameService = NicknameService;
//# sourceMappingURL=nickname.service.js.map