import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class RelationDto {
    @ApiProperty()
    @IsNumber()
    bannerId: number

    @ApiProperty()
    @IsNumber()
    toonId: number
}