import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/user.entity";

export class queryResponse {
    @ApiProperty()
    uid: string

    @ApiProperty()
    nickName: string
}