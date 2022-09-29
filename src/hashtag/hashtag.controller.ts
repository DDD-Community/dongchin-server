import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseArrayPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { ToonFindAllOptions } from 'src/toon/config/type.config';
import { HashTagDto } from './dto/hashtag-create.dto';
import { HashtagService } from './hashtag.service';

@ApiTags('hashtags')
@Controller('hashtags')
export class HashtagController {
  constructor(private hashTagService: HashtagService) {}

  @ApiOperation({ summary: '태그 생성' })
  @ApiBody({ type: HashTagDto })
  @ApiCreatedResponse({
    status: 201,
    description: '성공',
    schema: {
      example: new CommonResponseDto(201, true, '태그가 등록되었습니다.'),
    },
  })
  @ApiResponse({
    status: 400,
    description: '중복된 URL',
    schema: {
      example: new CommonResponseDto(400, false, 'url이 중복됩니다.'),
    },
  })
  @Post('/create')
  @UsePipes(ValidationPipe)
  createHasgtag(@Body() hashTagDto: HashTagDto): Promise<CommonResponseDto> {
    return this.hashTagService.createHashtag(hashTagDto);
  }

  /* 태그 전체 목록 */
  @ApiOperation({ summary: '태그 전체 목록' })
  @ApiNotFoundResponse({
    description: '태그 가져오기 실패',
    schema: {
      example: new CommonResponseDto(400, false, '태그 목록이 없습니다.'),
    },
  })
  @ApiOkResponse({
    description: '태그 목록 가져오기 성공',
    schema: {
      example: new CommonResponseDto(200, true, '태그 목록 조회 성공'),
    },
  })
  @Get('/list')
  getAllTags(): Promise<CommonResponseDto> {
    return this.hashTagService.getAllTags();
  }

  /* 인기 검색 태그 API 필요 */
  @ApiOperation({ summary: '인기 검색태그 API' })
  @ApiOkResponse({
    description: '인기 검색태그 가져오기 성공',
    schema: {
      example: new CommonResponseDto(200, true, '인기 검색 키워드'),
    },
  })
  @ApiNotFoundResponse({
    description: '인기 검색태그 가져오기 실패',
    schema: {
      example: new CommonResponseDto(
        400,
        false,
        '해쉬 태그가 존재하지 않습니다.',
      ),
    },
  })
  @Get('/popular-keyword')
  getPopularKeyWords(): Promise<CommonResponseDto> {
    return this.hashTagService.getPopularKeyWords();
  }

  /* 검색 API -> 검색 키워드에 따른 인스타툰 list 제공 + 검색 count + 1*/
  @ApiOperation({
    summary:
      '검색 API 예시 (input값 없을시 :/hashtags?tagIds=1,2,3) (input만 존재시 :/hashtags?input=육아)',
  })
  @ApiOkResponse({
    description: '검색에 따른 인툰리스트 가져오기 성공',
    schema: {
      example: new CommonResponseDto(200, true, '조회 성공'),
    },
  })
  @Get()
  findAll(
    @Query('input', new DefaultValuePipe(' ')) input: string,
    @Query(
      'tagIds',
      new DefaultValuePipe([]),
      new ParseArrayPipe({ items: Number, separator: ',' }),
    )
    tagIds?: number[],
  ): Promise<CommonResponseDto> {
    const search: ToonFindAllOptions = {
      input: input,
      tagIds: tagIds,
    };
    return this.hashTagService.findAll(search);
  }

  /* 주제 키워드 list를 제공하는 API */
  @ApiOperation({ summary: '주제 키워드 태그 목록 API' })
  @ApiNotFoundResponse({
    description: '주제 키워드 가져오기 실패',
    schema: {
      example: new CommonResponseDto(
        400,
        false,
        '주제 키워드가 존재하지 않습니다.',
      ),
    },
  })
  @ApiOkResponse({
    description: '태그 목록 가져오기 성공',
    schema: {
      example: new CommonResponseDto(200, true, '주제 키워드 list'),
    },
  })
  @Get('/topic')
  getTopicKeyWord(): Promise<CommonResponseDto> {
    return this.hashTagService.getTopicKeyWords();
  }

  /* 그림체 키워드 list를 제공하는 API */
  @ApiOperation({ summary: '그림체 키워드 태그 목록 API' })
  @ApiNotFoundResponse({
    description: '그림체 키워드 가져오기 실패',
    schema: {
      example: new CommonResponseDto(
        400,
        false,
        '그림체 키워드가 존재하지 않습니다.',
      ),
    },
  })
  @ApiOkResponse({
    description: '태그 목록 가져오기 성공',
    schema: {
      example: new CommonResponseDto(200, true, '그림체 키워드 list'),
    },
  })
  @Get('/draw-style')
  getDrawStyleKeyWord(): Promise<CommonResponseDto> {
    return this.hashTagService.getDrawStyleKeyWords();
  }
}
