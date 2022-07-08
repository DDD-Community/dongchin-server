import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BannerDto {
  // Banner DTO
  @ApiProperty()
  @IsString()
  name: string;
}
