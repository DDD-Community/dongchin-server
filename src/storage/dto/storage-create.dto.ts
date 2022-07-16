import { IsNumber, IsString } from 'class-validator';

export class StorageDto {
  constructor(name: string, nickName: string) {
    this.name = name;
    this.nickName = nickName;
  }
  @IsString()
  name: string;

  @IsString()
  nickName: string;
}
