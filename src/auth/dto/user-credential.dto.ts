import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserCredentialDto {
    @ApiProperty()
    @IsString() // 문자열인지 검사
    nickName: string;
}