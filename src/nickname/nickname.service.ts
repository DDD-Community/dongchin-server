import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './constant/nickName.config';
import { NickNameCredentialDto } from './dto/nickname-credential.dto';
import { Nickname } from '../entity/nickname.entity';
import { NicknameRepository } from '../repository/nickname.repository';
import { StorageRepository } from '../repository/storage.repository';
import { CommonResponseDto } from 'src/api/common-response.dto';

@Injectable()
export class NicknameService {
  readonly FAIL_DELETE: number = 0;

  constructor(
    @InjectRepository(NicknameRepository)
    private nickNameRepository: NicknameRepository,

    @InjectRepository(StorageRepository)
    private storageRepository: StorageRepository,
  ) {}

  //닉네임 생성 Function
  async createNickName(
    nicknameCredentialDto: NickNameCredentialDto,
  ): Promise<CommonResponseDto> {
    return this.nickNameRepository.createNickName(
      nicknameCredentialDto,
      this.storageRepository,
    );
  }

  //닉네임 조회 Function
  async getNickNameById(id: number): Promise<CommonResponseDto> {
    const user = await this.nickNameRepository.findOne(id);
    if (!user || !id) {
      throw new NotFoundException('닉네임을 찾을 수 없습니다.');
    }
    const response: CommonResponseDto = new CommonResponseDto(
      200,
      true,
      '닉네임을 찾았습니다.',
      user,
    );
    return response;
  }

  // 닉네임 이름으로 중복체크 Function
  async checkValidation(nickName: string): Promise<CommonResponseDto> {
    try {
      let response: CommonResponseDto;
      const user = await this.nickNameRepository
        .createQueryBuilder('nickname')
        .where('nickname.nickName = :nickName', { nickName })
        .getOne();
      if (user === undefined) {
        response = new CommonResponseDto(
          200,
          true,
          '닉네임 사용이 가능합니다.',
        );
      } else {
        response = new CommonResponseDto(
          200,
          false,
          '닉네임 사용이 불가능합니다.',
        );
      }
      return response;
    } catch (error) {}
  }

  //닉네임 수정 Function
  async updateNickName(
    id: number,
    nicknameCredentialDto: NickNameCredentialDto,
  ): Promise<CommonResponseDto> {
    const response = await this.getNickNameById(id);
    if (response.message === Config.NOT_FOUND_NICKNAME) {
      // 닉네임을 찾을 수 없다면
      throw new NotFoundException('id가 존재하지 않습니다.');
    } else {
      response.data.nickName = nicknameCredentialDto.nickName; // 닉네임 변경
    }

    try {
      const result = await this.nickNameRepository.save(response.data);
      const res: CommonResponseDto = new CommonResponseDto(
        200,
        true,
        '닉네임이 변경되었습니다.',
        result,
      );
      return res;
    } catch (error) {
      // 닉네임 id는 존재하지만 중복되는 닉네임으로 변경하는 경우
      if (error.code === Config.OVERLAP_ERROR_CODE) {
        throw new BadRequestException('변경하려는 닉네임이 중복됩니다.');
      }
    }
  }

  //닉네임 삭제 function
  async deleteBynickName(nickName: string): Promise<CommonResponseDto> {
    try {
      const result = await this.nickNameRepository
        .createQueryBuilder()
        .delete()
        .from(Nickname)
        .where('nickName = :nickName', { nickName: nickName })
        .execute();

      if (result.affected === this.FAIL_DELETE) {
        // delete 결과가 잘못됐다면
        throw new NotFoundException('닉네임을 찾을 수 없습니다.');
      } else {
        const response: CommonResponseDto = new CommonResponseDto(
          200,
          true,
          '닉네임이 삭제되었습니다.',
        );
        return response;
      }
    } catch (error) {}
  }
}
