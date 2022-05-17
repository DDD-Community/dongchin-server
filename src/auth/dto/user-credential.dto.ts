import { IsString } from "class-validator";

export class UserCredentialDto {
    @IsString()
    uid: string;

    @IsString()
    nickName: string;
}