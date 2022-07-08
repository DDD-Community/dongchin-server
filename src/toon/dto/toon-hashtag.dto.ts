import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class ToonHashTagDto {
  @ApiProperty({ default: [1, 2, 3] })
  @IsArray()
  hashTagIds: number[];

  @ApiProperty()
  @IsNumber()
  toonId: number;
}
