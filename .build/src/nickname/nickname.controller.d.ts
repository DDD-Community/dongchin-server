import { NickNameCredentialDto } from './dto/nickname-credential.dto';
import { NicknameService } from './nickname.service';
export declare class NicknameController {
    private nicknameService;
    constructor(nicknameService: NicknameService);
    updateNickName(id: number, nicknameCredentialDto: NickNameCredentialDto): Promise<any>;
    createNickName(nicknameCredentialDto: NickNameCredentialDto): Promise<any>;
    checkValidation(nickName: string): Promise<any>;
    deleteById(nickName: string): Promise<any>;
}
