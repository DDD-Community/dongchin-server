import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseFailDto, responseListDto, responseToonDto } from 'src/api/globalDTO';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonHashTagDto } from './dto/toon-hashtag.dto';
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
    @ApiCreatedResponse({status: 201, description: "성공"})
    @ApiNotFoundResponse({status:404, type: responseFailDto})
    @UsePipes(ValidationPipe)
    @Post('/banner')
    registerToBanner(
        @Body() relationDto: RelationDto
    ): Promise<any>{
        return this.toonService.registerToBanner(relationDto);
    }

    //POST 인스타툰에 태그 달기
    @ApiOperation({ summary: "인스타툰에 태그 등록하기"})
    @ApiCreatedResponse({status: 201, description: "성공"})
    @ApiNotFoundResponse({status:404, type: responseFailDto})
    @UsePipes(ValidationPipe)
    @Post('/hashtag')
    registerHashtag(
        @Body() toonHashDto: ToonHashTagDto
    ): Promise<any>{
        return this.toonService.registerHashtag(toonHashDto);
    }



    //GET 최근 등록 순으로 인스타툰 가져오기
    @ApiOperation({summary: "새롭게 등록된 툰 API"})
    @ApiResponse({status: 200, description:"성공", type: responseListDto})
    @ApiNotFoundResponse({status: 404, description:"툰이 존재하지 않음", type:responseFailDto})
    @Get('/recent')
    getRecentToons(): Promise<any>{
        return this.toonService.getRecentToons();
    }
}
