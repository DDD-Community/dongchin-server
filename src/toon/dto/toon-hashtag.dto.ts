import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class ToonHashTagDto {
  @ApiProperty()
  @IsArray()
  hashTagIds: number[];

  @ApiProperty()
  @IsNumber()
  toonId: number;
}
