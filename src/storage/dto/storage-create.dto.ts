import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class StorageDto {
  constructor(name: string, nickName: string) {
    this.name = name;
    this.nickName = nickName;
  }
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  nickName: string;
}
