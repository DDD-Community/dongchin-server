import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './constant/nickName.config';
import { NickNameCredentialDto } from './dto/nickname-credential.dto';
import { Nickname } from './nickname.entity';
import { NicknameRepository } from './nickname.repository';

@Injectable()
export class NicknameService {
    readonly FAIL_DELETE : number = 0;

    constructor(
        @InjectRepository(NicknameRepository)
        private nickNameRepository : NicknameRepository,
    ){}
    
    //닉네임 생성 Function
    async createNickName(nicknameCredentialDto : NickNameCredentialDto): Promise<{statusCode:number, ok: boolean; id?:number; error?: string }> {
        return this.nickNameRepository.createNickName(nicknameCredentialDto);
    };

    //닉네임 조회 Function
    async getNickNameById(id : number) : Promise <Nickname> {
        const user = await this.nickNameRepository.findOne(id);
        if(!user || !id){
            const notNickname = new Nickname();
            notNickname.id = id;
            notNickname.nickName = Config.NOT_FOUND_NICKNAME;
            return notNickname;
        }
        Logger.verbose('user', JSON.stringify(user));
        return user;
    };

    //닉네임 수정 Function
    async updateNickName(id : number, nicknameCredentialDto : NickNameCredentialDto) : Promise <{statusCode: number, ok: boolean, error?: string}> {
        const user = await this.getNickNameById(id);
        Logger.verbose('user', JSON.stringify(user));
        if(user.nickName === Config.NOT_FOUND_NICKNAME ){
            throw new NotFoundException(Object.assign({ // 닉네임의 id가 없는경우
                statusCode: 404,
                ok: false,
                error: "id는 존재하지 않습니다.",
            }));
        }
        user.nickName = nicknameCredentialDto.nickName; // 닉네임 변경
        
        try{
            await this.nickNameRepository.save(user);
        }catch{ // 닉네임 id는 존재하지만 중복되는 닉네임으로 변경하는 경우
            throw new UnauthorizedException(Object.assign({
                statusCode: 401,
                ok: false,
                error: "id는 존재했지만 변경하려는 닉네임이 중복됩니다.",
            }));
        }
        return Object.assign({
            statusCode: 200,
            ok: true,
        });
    };

    //닉네임 삭제 function
    async deleteById(id:number): Promise<{statusCode: number, ok: boolean; error?: string}>{
        const result = await this.nickNameRepository.delete({id: id});
        
        if(result.affected === this.FAIL_DELETE){ // delete 결과가 잘못됐다면
            throw new NotFoundException(
                Object.assign({
                    statusCode: 404,
                    ok: false,
                    error: "id를 찾을 수 없습니다.",
                })
            );
            //throw new NotFoundException({ok: false, error: Config.ID_ERROR_MESSAGE });
        }else{
            return Object.assign({
                statusCode: 200,
                ok: true,
            });
        }
    };
}
