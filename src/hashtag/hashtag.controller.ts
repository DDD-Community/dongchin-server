import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseFailDto, responseTagDto, responseTagListDto } from 'src/api/globalDTO';
import { HashTagDto } from './dto/hashtag-create.dto';
import { HashtagService } from './hashtag.service';

@ApiTags('hashtag')
@Controller('hashtag')
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

    @ApiOperation({summary: "태그 전체 목록"})
    @ApiNotFoundResponse({description:"태그 가져오기 실패", type: responseFailDto})
    @ApiOkResponse({description:"태그 목록 가져오기 성공", type: responseTagListDto})
    @Get('/list')
    getAllTags(): Promise<any> {
        return this.hashTagService.getAllTags();
    }
    /* 인기 검색 키워드 API 필요 */
    @ApiOperation({summary: "인기검색키워드 API"})
    @ApiOkResponse({description:"인기 검색 키워드 가져오기 성공", type: responseTagListDto})
    @ApiNotFoundResponse({description:"인기 검색 키워드 가져오기 실패", type: responseFailDto})
    @Get('/popular-keyword')
    getPopularKeyWords(): Promise<any> {
        return this.hashTagService.getPopularKeyWords();
    }
}
