import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
    ){}
    
    //닉네임 생성 Function
    async createNickName(userCredentialDto : UserCredentialDto): Promise <{ok: boolean; error?: string }> {
        return this.userRepository.createNickName(userCredentialDto);
    }

    //닉네임 조회 Function
    async getNickNameByUid(uid : string) : Promise <User> {
        const user = await this.userRepository.findOne(uid);
        if(!user || uid === " "){
            const notUser = new User();
            notUser.uid = uid;
            notUser.nickName = "Not Found";
            return notUser;
        }
        Logger.verbose('user', JSON.stringify(user));
        return user;
    }
}
