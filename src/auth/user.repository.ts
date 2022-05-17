import { Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserCredentialDto } from "./dto/user-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createNickName(userCredentialDto : UserCredentialDto): Promise<string> { // 닉네임 생성 Function
        const { uid, nickName } = userCredentialDto;

        const user = this.create({ uid, nickName })

        try{
            await this.save(user);
            Logger.verbose('user', JSON.stringify(user));
            return 'true';
        }catch(error){
            if(error.code === '23505'){
                return 'false';
            }
        }
    }
}