import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HashTagDto {
  @ApiProperty()
  @IsString()
  title: string; // 태그 이름

  @ApiProperty()
  @IsString()
  category: string; // 주제 태그 or 그림체 태그
}
