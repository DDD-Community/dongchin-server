import { ApiProperty } from '@nestjs/swagger';
import { Banner } from '../entity/banner.entity';
import { HashTag } from '../entity/hashtag.entity';
import { Nickname } from '../entity/nickname.entity';
import { Toon } from '../entity/toon.entity';

export class responseFailDto {
  @ApiProperty({ description: '상태 코드', default: 'Error Number' })
  statusCode: number;

  @ApiProperty({ description: '실패', default: false })
  ok: boolean;

  @ApiProperty({ description: '실패 메시지' })
  message: string;
}

export class responseDto {
  @ApiProperty({ description: '객체' })
  data: Nickname;

  @ApiProperty({ description: '상태 코드' })
  statusCode: number;

  @ApiProperty({ description: '성공', default: true })
  ok: boolean;

  @ApiProperty({ description: '성공 메시지' })
  message: string;
}

export class responseListDto {
  @ApiProperty({ description: '인스타툰 리스트', default: [] })
  data: Toon[];

  @ApiProperty({ description: '상태 코드' })
  statusCode: number;

  @ApiProperty({ description: '성공', default: true })
  ok: boolean;

  @ApiProperty({ description: '성공 메시지' })
  message: string;
}

export class responseToonDto {
  @ApiProperty({ description: '인스타툰 객체' })
  data: Toon;

  @ApiProperty({ description: '상태 코드' })
  statusCode: number;

  @ApiProperty({ description: '성공', default: true })
  ok: boolean;

  @ApiProperty({ description: '성공 메시지' })
  message: string;
}

export class responseBannerDto {
  @ApiProperty({ description: '배너 객체' })
  data: Banner;

  @ApiProperty({ description: '상태 코드', default: 201 })
  statusCode: number;

  @ApiProperty({ description: '성공', default: true })
  ok: boolean;

  @ApiProperty({ description: '성공 메시지' })
  message: string;
}

export class responseBannerListDto {
  @ApiProperty({ description: '배너 리스트', default: [] })
  data: Banner[];

  @ApiProperty({ description: '상태 코드', default: 200 })
  statusCode: number;

  @ApiProperty({ description: '성공', default: true })
  ok: boolean;

  @ApiProperty({ description: '성공 메시지' })
  message: string;
}

export class responseTagListDto {
  @ApiProperty({ description: '해쉬태그 리스트', default: [] })
  data: HashTag[];

  @ApiProperty({ description: '상태 코드', default: 200 })
  statusCode: number;

  @ApiProperty({ description: '성공', default: true })
  ok: boolean;

  @ApiProperty({ description: '성공 메시지' })
  message: string;
}

export class responseTagDto {
  @ApiProperty({ description: '인스타툰 태그 객체' })
  data: HashTag;

  @ApiProperty({ description: '상태 코드' })
  statusCode: number;

  @ApiProperty({ description: '성공', default: true })
  ok: boolean;

  @ApiProperty({ description: '성공 메시지' })
  message: string;
}
