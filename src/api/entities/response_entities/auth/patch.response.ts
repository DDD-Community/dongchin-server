import { ApiProperty } from "@nestjs/swagger";
export class patchResponse {
    @ApiProperty({
        description: "status code",
        default:200
    })
    statusCode: number;

    @ApiProperty()
    ok: boolean;
};

export class patchFailResponse {
    @ApiProperty({
        description: "status code",
        default:404
    })
    statusCode:number;


    @ApiProperty({
        default:false
    })
    ok: boolean;

    @ApiProperty({
        description: "에러 메시지",
        default: "id는 존재하지 않습니다."
    })
    error: string;
};

export class patchFailByNickResponse{
    @ApiProperty({
        description: "status code",
        default:401
    })
    statusCode:number;


    @ApiProperty({
        default:false
    })
    ok: boolean;

    @ApiProperty({
        description: "에러 메시지",
        default: "id는 존재했지만 변경하려는 닉네임이 중복됩니다."
    })
    error: string;
};