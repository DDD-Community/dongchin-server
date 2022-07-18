import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class StorageToonDto {
  constructor(storageId: number, toonId: number) {
    this.storageId = storageId;
    this.toonId = toonId;
  }

  @ApiProperty({ description: '보관함 id' })
  @IsNumber()
  storageId: number;

  @ApiProperty({ description: '인스타툰 id' })
  @IsNumber()
  toonId: number;
}
