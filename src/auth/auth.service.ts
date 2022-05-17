import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
    ){}
    
    //닉네임 생성 Function
    async signUp(userCredentialDto : UserCredentialDto): Promise <string> {
        return this.userRepository.createNickName(userCredentialDto);
    }

    //닉네임 조회 Function
    async getNickNameByUid(uid : string) : Promise <string> {
        const user = await this.userRepository.findOne(uid);
        if(!user){
            throw new NotFoundException('Database cannot get nickName');
        }
        Logger.verbose('user', JSON.stringify(user));
        return user.nickName;
    }
}
