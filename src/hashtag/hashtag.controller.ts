import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseFailDto, responseTagDto, responseTagListDto } from 'src/api/globalDTO';
import { HashTagDto } from './dto/hashtag-create.dto';
import { HashtagService } from './hashtag.service';

@ApiTags('hashtags')
@Controller('hashtags')
export class HashtagController {
    constructor(private hashTagService: HashtagService){}

    @ApiOperation({summary: "태그 생성"})
    @ApiBody({type:HashTagDto})
    @ApiCreatedResponse( {status:201, description: "성공", type: responseTagDto})
    @ApiResponse({status: 400, description: "중복된 URL", type: responseFailDto})
    @Post('/create')
    @UsePipes(ValidationPipe)
    createHasgtag(@Body() hashTagDto: HashTagDto): Promise<any> {
        return this.hashTagService.createHashtag(hashTagDto);
    }

    /* 태그 전체 목록 */
    @ApiOperation({summary: "태그 전체 목록"})
    @ApiNotFoundResponse({description:"태그 가져오기 실패", type: responseFailDto})
    @ApiOkResponse({description:"태그 목록 가져오기 성공", type: responseTagListDto})
    @Get('/list')
    getAllTags(): Promise<any> {
        return this.hashTagService.getAllTags();
    }

    /* 인기 검색 태그 API 필요 */
    @ApiOperation({summary: "인기 검색태그 API"})
    @ApiOkResponse({description:"인기 검색태그 가져오기 성공", type: responseTagListDto})
    @ApiNotFoundResponse({description:"인기 검색태그 가져오기 실패", type: responseFailDto})
    @Get('/popular-keyword')
    getPopularKeyWords(): Promise<any> {
        return this.hashTagService.getPopularKeyWords();
    }

    /* 검색 API -> 검색 키워드에 따른 인스타툰 list 제공 + 검색 count + 1*/
    @ApiOperation({summary: "태그 검색 API: 키워드에 따른 인툰 list"})
    @ApiNotFoundResponse({description:"검색 키워드에 따른 인툰리스트 가져오기 실패", type: responseFailDto})
    @Get()
    getSearchKeyWord(@Query('tagName') tagName: String): Promise<any> {
        return this.hashTagService.getSearchKeyWord(tagName);
    }

    /* 주제 키워드 list를 제공하는 API */
    @ApiOperation({summary: '주제 키워드 태그 목록 API'})
    @ApiNotFoundResponse({description:"주제 키워드 가져오기 실패", type: responseFailDto})
    @ApiOkResponse({description:"태그 목록 가져오기 성공", type: responseTagListDto})
    @Get('/topic')
    getTopicKeyWord(): Promise<any> {
        return this.hashTagService.getTopicKeyWord();
    }


    /* 그림체 키워드 list를 제공하는 API */
    @ApiOperation({summary: '그림체 키워드 태그 목록 API'})
    @ApiNotFoundResponse({description:"그림체 키워드 가져오기 실패", type: responseFailDto})
    @ApiOkResponse({description:"태그 목록 가져오기 성공", type: responseTagListDto})
    @Get('/draw-style')
    getDrawStyleKeyWord(): Promise<any> {
        return this.hashTagService.getDrawStyleKeyWord();
    }
}
