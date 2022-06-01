import { ApiProperty } from "@nestjs/swagger";


export  class CreateResponse{
    @ApiProperty({
        description:"status code",
        default: 201,
    })
    statusCode: number;

    @ApiProperty({
        description:"true or false",
        default: true
    })
    ok: boolean;

    @ApiProperty({
        description:"id값 -> PATCH를 위해 가지고 있어야함."
    })
    id: number;
};

export  class CreateFailResponse{
    @ApiProperty({
        description: "status code",
        default: 401
    })
    statusCode: number;
    
    @ApiProperty({
        description: "true or false",
        default: false
    })
    ok: boolean;

    @ApiProperty({
        description: "error message",
        default: "닉네임이 중복됩니다."
    })
    error: string;
};