import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/user.entity";

export class patchResponse {
    @ApiProperty()
    ok: boolean;
}