import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class StorageToonDto {
  constructor(storageId: number, toonId: number) {
    this.storageId = storageId;
    this.toonId = toonId;
  }

  @ApiProperty()
  @IsNumber()
  storageId: number;

  @ApiProperty()
  @IsNumber()
  toonId: number;
}
