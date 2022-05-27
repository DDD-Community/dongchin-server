import { ApiProperty } from "@nestjs/swagger";

export class DeleteResponse {
    @ApiProperty({
        description: "status code",
        default: 200
    })
    statusCode: number;

    @ApiProperty({
        default: true
    })
    ok: boolean
};

export class DeleteFailResponse {
    @ApiProperty({
        description: "status code",
        default: 404
    })
    statusCode: number;

    @ApiProperty({
        default: false
    })
    ok: boolean

    @ApiProperty({
        default: "id를 찾을 수 없습니다."
    })
    error: string


};