import { ApiProperty } from "@nestjs/swagger";


export abstract class CreateResponse{
    @ApiProperty()
    ok: boolean;

    @ApiProperty()
    id: number;
}