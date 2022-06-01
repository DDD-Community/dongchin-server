import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class NickNameCredentialDto {
    @ApiProperty()
    @IsString() // 문자열인지 검사
    nickName: string;
}