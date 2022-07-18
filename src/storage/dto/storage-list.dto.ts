import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class StorageDetailDto {
  constructor(
    storageName: string,
    storageId: number,
    toonImg: string,
    count: number,
  ) {
    this.storageName = storageName;
    this.storageId = storageId;
    this.toonImg = toonImg;
    this.count = count;
  }
  @ApiProperty()
  @IsString()
  storageName: string;

  @ApiProperty()
  @IsNumber()
  storageId: number;

  @ApiProperty()
  @IsString()
  toonImg: string;

  @ApiProperty()
  @IsNumber()
  count: number;
}
