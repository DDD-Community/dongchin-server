"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NicknameRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const nickName_config_1 = require("../nickname/constant/nickName.config");
const nickname_entity_1 = require("../entity/nickname.entity");
let NicknameRepository = class NicknameRepository extends typeorm_1.Repository {
    async createNickName(nicknameCredentialDto, storageRepository) {
        const { nickName } = nicknameCredentialDto;
        const storage = storageRepository.create({ name: '기본 보관함' });
        const nickname = this.create({ nickName });
        storage.save(nickname);
        try {
            await this.save(nickname);
            await storageRepository.save(storage);
            common_1.Logger.verbose('user', JSON.stringify(nickname));
            return Object.assign({
                data: nickname,
                statusCode: 201,
                ok: true,
                message: '닉네임이 저장되었습니다.',
            });
        }
        catch (error) {
            if (error.code === nickName_config_1.Config.OVERLAP_ERROR_CODE) {
                throw new common_1.BadRequestException(Object.assign({
                    statusCode: 400,
                    ok: false,
                    message: '닉네임이 중복됩니다.',
                }));
            }
            console.log(error.code);
        }
    }
};
NicknameRepository = __decorate([
    (0, typeorm_1.EntityRepository)(nickname_entity_1.Nickname)
], NicknameRepository);
exports.NicknameRepository = NicknameRepository;
//# sourceMappingURL=nickname.repository.js.map