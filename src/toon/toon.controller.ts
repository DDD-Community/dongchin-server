import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseFailDto, responseListDto, responseToonDto } from 'src/api/globalDTO';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonService } from './toon.service';

@ApiTags('toon')
@Controller('toon')
export class ToonController {
    constructor(private toonService: ToonService){}

    //POST 인툰 생성
    @ApiOperation({ summary: "인스타툰 링크생성"})
    @ApiBody({ type: ToonDto })
    @ApiCreatedResponse( {status:201, description: "성공", type: responseToonDto})
    @ApiResponse( {status: 400, description: "중복된 URL", type: responseFailDto} )
    @Post('/create')
    @UsePipes(ValidationPipe)
    createToon(@Body() toonDto : ToonDto): Promise<any> {
        return this.toonService.createToon(toonDto);
    }

    //GET 인툰 목록
    @ApiOperation({ summary: "인스타툰 목록"})
    @ApiResponse({status: 200, description: "성공", type: responseListDto})
    @Get()
    getAllToons(){
        return this.toonService.getAllToons();
    }

    //POST 배너에 Toon 등록하기
    @ApiOperation({ summary: "인스타툰 배너에 등록하기"})
    @UsePipes(ValidationPipe)
    @Post('/banner')
    registerToBanner(
        @Body() relationDto: RelationDto
    ): Promise<any>{
        return this.toonService.registerToBanner(relationDto);
    }
}
