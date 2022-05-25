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
    async createNickName(userCredentialDto : UserCredentialDto): Promise <{ok: boolean; id?: number; error?: string }> {
        return this.userRepository.createNickName(userCredentialDto);
    }

    //닉네임 조회 Function
    async getNickNameById(id : number) : Promise <User> {
        const user = await this.userRepository.findOne(id);
        if(!user || !id){
            const notUser = new User();
            notUser.id = id;
            notUser.nickName = "Not Found";
            return notUser;
        }
        Logger.verbose('user', JSON.stringify(user));
        return user;
    }

    //닉네임 수정 Function
    async updateNickName(id : number, userCredentialDto : UserCredentialDto) : Promise <{ok: boolean}> {
        const user = await this.getNickNameById(id);
        Logger.verbose('user', JSON.stringify(user));
        if(user.nickName === "Not Found"){
            return {ok: false}
        }
        user.nickName = userCredentialDto.nickName; // 닉네임 변경
        await this.userRepository.save(user);
        return {ok: true}
    }
}
