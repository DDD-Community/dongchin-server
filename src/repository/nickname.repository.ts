import { BadRequestException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Config } from '../nickname/constant/nickName.config';
import { NickNameCredentialDto } from '../nickname/dto/nickname-credential.dto';
import { Nickname } from '../entity/nickname.entity';
import { StorageRepository } from './storage.repository';

@EntityRepository(Nickname)
export class NicknameRepository extends Repository<Nickname> {
  async createNickName(
    nicknameCredentialDto: NickNameCredentialDto,
    storageRepository: StorageRepository,
  ): Promise<{ statusCode: number; ok: boolean; id?: number; error?: string }> {
    // 닉네임 생성 Function
    const { nickName } = nicknameCredentialDto;
    const storage = storageRepository.create({ name: '기본 보관함' });
    const nickname = this.create({ nickName });
    storage.nickname = nickname;
    try {
      // 닉네임 중복되지 않는다면
      await this.save(nickname);
      await storageRepository.save(storage);
      Logger.verbose('user', JSON.stringify(nickname));
      return Object.assign({
        data: nickname,
        statusCode: 201,
        ok: true,
        message: '닉네임이 저장되었습니다.',
      });
    } catch (error) {
      // 중복된 닉네임이라면
      if (error.code === Config.OVERLAP_ERROR_CODE) {
        // 중복 에러 메시지라면
        throw new BadRequestException(
          Object.assign({
            statusCode: 400,
            ok: false,
            message: '닉네임이 중복됩니다.',
          }),
        );
      }
      console.log(error.code);
    }
  }
}
