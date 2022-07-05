import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ToonDto {
  @ApiProperty()
  @IsString()
  url: string; // 인스타툰의 계정 링크주소

  @ApiProperty()
  @IsString()
  name: string; // 계정 이름
}
