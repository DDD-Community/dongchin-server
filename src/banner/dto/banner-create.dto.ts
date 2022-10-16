import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BannerCredentialDto {
  // Banner DTO
  @ApiProperty()
  @IsString()
  name: string;
}
