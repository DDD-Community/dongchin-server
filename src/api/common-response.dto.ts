import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CommonResponseDto {
  constructor(
    statusCode: number,
    isSuccess: boolean,
    message: string,
    data: any = [],
  ) {
    this.data = data;
    this.statusCode = statusCode;
    this.isSuccess = isSuccess;
    this.message = message;
  }
  @ApiProperty({ description: 'data값 empty일 수도 있음' })
  data: any;

  @ApiProperty({ description: '상태코드', default: 200 })
  @IsNumber()
  statusCode: number;

  @ApiProperty({ description: '성공여부', default: true })
  @IsBoolean()
  isSuccess: boolean;

  @ApiProperty({ description: '메시지', default: '성공하였습니다.' })
  @IsString()
  message: string;
}
