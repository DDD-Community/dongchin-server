import { Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserCredentialDto } from "./dto/user-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createNickName(userCredentialDto : UserCredentialDto): Promise<{ok: boolean; id?:number; error?: string }> { // 닉네임 생성 Function
        const { nickName } = userCredentialDto;

        const user = this.create({ nickName })

        try{ // 닉네임 중복되지 않는다면
            await this.save(user);
            Logger.verbose('user', JSON.stringify(user));
            return {ok: true, id:user.id};
        }
        catch(error){ // 중복된 닉네임이라면
            if(error.code === '23505'){
                return {ok: false, error: '닉네임이 중복됩니다.'};
            }
        }
    }
}