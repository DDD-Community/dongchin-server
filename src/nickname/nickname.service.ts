import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './constant/nickName.config';
import { NickNameCredentialDto } from './dto/nickname-credential.dto';
import { Nickname } from '../entity/nickname.entity';
import { NicknameRepository } from '../repository/nickname.repository';
import { responseFailDto } from 'src/api/globalDTO';

@Injectable()
export class NicknameService {
    readonly FAIL_DELETE : number = 0;

    constructor(
        @InjectRepository(NicknameRepository)
        private nickNameRepository : NicknameRepository,
    ){}
    
    //닉네임 생성 Function
    async createNickName(nicknameCredentialDto : NickNameCredentialDto): Promise<any> {
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

    // 닉네임 이름으로 중복체크 Function
    async checkValidation(nickName: String): Promise <any> {
        try{
            const user = await this.nickNameRepository
            .createQueryBuilder('nickname')
            .where('nickname.nickName = :nickName', {nickName})
            .getOne()
            if(user === undefined){
                return Object.assign({
                    statusCode: 200,
                    ok:true,
                    message: "닉네임 사용이 가능합니다.",
                });
            }else{
                return Object.assign({
                    statusCode: 200,
                    ok:false,
                    message: "닉네임 사용이 불가능합니다.",
                });
            }
        }catch(error){
            Logger.verbose('error', error);
        }
    }

    //닉네임 수정 Function
    async updateNickName(id : number, nicknameCredentialDto : NickNameCredentialDto) : Promise <any> {
        const user = await this.getNickNameById(id);
        Logger.verbose('user', JSON.stringify(user));
        try{
            const user = await this.getNickNameById(id);
            Logger.verbose('user', JSON.stringify(user));
            if(user.nickName === Config.NOT_FOUND_NICKNAME){ // 닉네임을 찾을 수 없다면
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    ok:false,
                    message: "id가 존재하지 않습니다.",
                }))
            }
        }catch(NotFoundException){
            throw NotFoundException;
        }
        user.nickName = nicknameCredentialDto.nickName; // 닉네임 변경
        
        try{
            const result = await this.nickNameRepository.save(user);
            Logger.verbose('user', JSON.stringify(result));
            return Object.assign({
                data: result,
                statusCode: 200,
                ok: true,
                message: "닉네임이 변경되었습니다."
            });
        }catch(error){ // 닉네임 id는 존재하지만 중복되는 닉네임으로 변경하는 경우
            if(error.code === Config.OVERLAP_ERROR_CODE){
                throw new BadRequestException(Object.assign({
                    statusCode: 400,
                    ok: false,
                    message: "변경하려는 닉네임이 중복됩니다."
                }))
            }
        }
    };

    //닉네임 삭제 function
    async deleteById(id:number): Promise<any>{
        try{
            const user = await this.getNickNameById(id);
            const result = await this.nickNameRepository.delete({id: id});
        
            if(result.affected === this.FAIL_DELETE){ // delete 결과가 잘못됐다면
                throw new NotFoundException(
                    Object.assign({
                        statusCode: 404,
                        ok: false,
                        message: "id를 찾을 수 없습니다.",
                    })
                );
        }else{
            return Object.assign({
                data: user,
                statusCode: 200,
                ok: true,
                message: "닉네임이 삭제되었습니다."
            });
        }
        }catch(NotFoundException){
            throw NotFoundException;
        }
    };
}
