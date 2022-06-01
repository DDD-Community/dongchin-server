import { Logger, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { NickNameCredentialDto } from "./dto/nickname-credential.dto";
import { Nickname } from "./nickname.entity";

@EntityRepository(Nickname)
export class NicknameRepository extends Repository<Nickname> {
    readonly OVERLAP_ERROR_CODE: string = '23505';

    async createNickName(nicknameCredentialDto : NickNameCredentialDto): Promise<{statusCode:number, ok: boolean; id?:number; error?: string }> { // 닉네임 생성 Function
        const { nickName } = nicknameCredentialDto;

        const user = this.create({ nickName });

        try{ // 닉네임 중복되지 않는다면
            await this.save(user);
            Logger.verbose('user', JSON.stringify(user));
            return Object.assign({
                statusCode: 201,
                ok: true,
                id: user.id,
            });
        }
        catch(error){ // 중복된 닉네임이라면
            if(error.code === this.OVERLAP_ERROR_CODE){ // 중복 에러 메시지라면
                throw new UnauthorizedException(Object.assign({
                    statusCode: 401,
                    ok: false,
                    error: "닉네임이 중복됩니다.",
                }));
            }
        }
    };
}