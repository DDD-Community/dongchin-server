import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StorageDto {
  constructor(name: string, nickName: string) {
    this.name = name;
    this.nickName = nickName;
  }
  @ApiProperty({ description: '보관함 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  nickName: string;
}
