import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFailResponse, CreateResponse } from 'src/api/entities/response_entities/auth/create.response';
import { ToonDto } from './dto/toon-create.dto';
import { ToonService } from './toon.service';

@ApiTags('toon')
@Controller('toon')
export class ToonController {
    constructor(private toonService: ToonService){}

    //POST 인툰 생성
    @ApiOperation({ summary: "인스타툰 링크생성"})
    @ApiBody({ type: ToonDto })
    @ApiCreatedResponse( {status:201, description: "성공", type: CreateResponse})
    @ApiResponse( {status: 401, description: "중복된 URL", type: CreateFailResponse} )
    @Post()
    @UsePipes(ValidationPipe)
    createToon(@Body() toonDto : ToonDto): Promise<{statusCode: number, ok: boolean, id?: number, error?: string}> {
        return this.toonService.createToon(toonDto);
    }

    //GET 인툰 목록
    @ApiOperation({ summary: "인스타툰 목록"})
    @Get()
    getAllToons(){
        return this.toonService.getAllToons();
    }
}
