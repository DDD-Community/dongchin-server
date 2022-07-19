import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class ToonsListDto {
  @ApiProperty({ description: '배열에 인스타툰 id 담기', default: [1, 2, 3] })
  @IsArray()
  toonsIdArray: number[];
}
