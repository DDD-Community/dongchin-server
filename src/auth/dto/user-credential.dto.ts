import { IsString } from "class-validator";

export class UserCredentialDto {
    @IsString() // 문자열인지 검사
    uid: string;

    @IsString() // 문자열인지 검사
    nickName: string;
}