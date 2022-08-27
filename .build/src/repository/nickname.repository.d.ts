import { Repository } from 'typeorm';
import { NickNameCredentialDto } from '../nickname/dto/nickname-credential.dto';
import { Nickname } from '../entity/nickname.entity';
import { StorageRepository } from './storage.repository';
export declare class NicknameRepository extends Repository<Nickname> {
    createNickName(nicknameCredentialDto: NickNameCredentialDto, storageRepository: StorageRepository): Promise<{
        statusCode: number;
        ok: boolean;
        id?: number;
        error?: string;
    }>;
}
