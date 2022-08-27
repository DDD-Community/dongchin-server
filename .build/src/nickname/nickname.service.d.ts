import { NickNameCredentialDto } from './dto/nickname-credential.dto';
import { Nickname } from '../entity/nickname.entity';
import { NicknameRepository } from '../repository/nickname.repository';
import { StorageRepository } from '../repository/storage.repository';
export declare class NicknameService {
    private nickNameRepository;
    private storageRepository;
    readonly FAIL_DELETE: number;
    constructor(nickNameRepository: NicknameRepository, storageRepository: StorageRepository);
    createNickName(nicknameCredentialDto: NickNameCredentialDto): Promise<any>;
    getNickNameById(id: number): Promise<Nickname>;
    checkValidation(nickName: string): Promise<any>;
    updateNickName(id: number, nicknameCredentialDto: NickNameCredentialDto): Promise<any>;
    deleteBynickName(nickName: string): Promise<any>;
}
