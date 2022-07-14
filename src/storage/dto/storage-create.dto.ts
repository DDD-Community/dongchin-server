import { IsString } from 'class-validator';

export class StorageDto {
  constructor(name: string) {
    this.name = name;
  }
  @IsString()
  name: string;
}
