import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
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
import { Response } from 'express';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { responseFailDto, responseToonDto } from '../api/globalDTO';
import { RecommendConfig } from './config/type.config';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonHashTagDto } from './dto/toon-hashtag.dto';
import { ToonService } from './toon.service';

@ApiTags('toons')
@Controller('toons')
export class ToonController {
  constructor(private toonService: ToonService) {}
  //GET 인스타툰 html 정적로드 하기
  @ApiOperation({
    summary: 'html render API',
  })
  @Get('/page')
  showHtmlRendering(@Query('name') name: string, @Res() res: Response) {
    return res.render(this.toonService.showHtmlRendering(name));
  }

  //GET 최근 등록 순으로 인스타툰 가져오기
  @ApiOperation({ summary: '새롭게 등록된 툰 API' })
  @ApiOkResponse({
    status: 200,
    description: '성공',
    schema: {
      example: new CommonResponseDto(200, true, '최근 등록된 인스타툰 목록'),
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '툰이 존재하지 않음',
    schema: {
      example: new CommonResponseDto(404, false, '등록된 툰이 없습니다.'),
    },
  })
  @Get('/recent')
  getRecentToons(): Promise<CommonResponseDto> {
    return this.toonService.getRecentToons();
  }

  @ApiOperation({ summary: '실시간 인기툰 API' })
  @ApiOkResponse({
    status: 200,
    schema: { example: new CommonResponseDto(200, true, '조회 성공') },
  })
  @Get('/popular-list')
  getPopularList(): Promise<CommonResponseDto> {
    return this.toonService.getPopularList();
  }

  //Patch bookmark
  @ApiOperation({
    summary:
      '유저마다 좋아요 누른 툰과 북마크 툰 등록 API / 등록: key = true 등록 취소: key = false',
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: new CommonResponseDto(200, true, '좋아요 및 북마크 추가'),
    },
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: new CommonResponseDto(200, true, '좋아요 및 북마크 취소'),
    },
  })
  @Patch('isLikeBookmark')
  patchRecommended(
    @Query('nickName') nickName: string,
    @Query('toonId', ParseIntPipe) toonId: number,
    @Query('key', ParseBoolPipe) key: boolean,
  ): Promise<CommonResponseDto> {
    const recommendConfig: RecommendConfig = {
      nickName: nickName,
      toonId: toonId,
      key: key,
    };
    return this.toonService.patchRecommended(recommendConfig);
  }

  //GET 인툰 목록
  @ApiOperation({ summary: '인스타툰 전체 목록 API' })
  @ApiResponse({
    status: 200,
    description: '성공',
    schema: { example: new CommonResponseDto(200, true, '성공') },
  })
  @Get()
  getAllToons(): Promise<CommonResponseDto> {
    return this.toonService.getAllToons();
  }

  @ApiOperation({ summary: '랜덤 추천툰 API 4개' })
  @ApiOkResponse({
    status: 200,
    description: '추천 API 성공',
    schema: {
      example: new CommonResponseDto(200, true, '추천 API 성공'),
    },
  })
  @Get('/random')
  getRandomToons(): Promise<CommonResponseDto> {
    return this.toonService.getRandomToons();
  }

  //GET 인툰 정보
  @ApiOperation({ summary: '인스타툰 상세 정보 API' })
  @ApiResponse({
    status: 200,
    schema: {
      example: new CommonResponseDto(200, true, '성공'),
    },
  })
  @Get('/:nickName/:toonId')
  getToonById(
    @Param('nickName') nickName: string,
    @Param('toonId', ParseIntPipe) toonId: number,
  ): Promise<CommonResponseDto> {
    return this.toonService.getToonById(nickName, toonId);
  }

  //POST 인툰 생성
  @ApiOperation({ summary: '인스타툰 링크생성' })
  @ApiBody({ type: ToonDto })
  @ApiCreatedResponse({
    status: 201,
    description: '성공',
    type: responseToonDto,
  })
  @ApiResponse({
    status: 400,
    description: '중복된 URL',
    type: responseFailDto,
  })
  @Post('/create')
  @UsePipes(ValidationPipe)
  createToon(@Body() toonDto: ToonDto): Promise<any> {
    return this.toonService.createToon(toonDto);
  }

  //POST 배너에 Toon 등록하기
  @ApiOperation({ summary: '인스타툰 배너에 등록하기' })
  @ApiCreatedResponse({ status: 201, description: '성공' })
  @ApiNotFoundResponse({ status: 404, type: responseFailDto })
  @UsePipes(ValidationPipe)
  @Post('/banner')
  registerToBanner(@Body() relationDto: RelationDto): Promise<any> {
    return this.toonService.registerToBanner(relationDto);
  }

  //POST 인스타툰에 태그 달기
  @ApiOperation({ summary: '인스타툰에 태그 등록하기' })
  @ApiCreatedResponse({ status: 201, description: '성공' })
  @ApiNotFoundResponse({ status: 404, type: responseFailDto })
  @ApiBody({ type: ToonHashTagDto })
  @UsePipes(ValidationPipe)
  @Post('/hashtag')
  registerHashtag(@Body() toonHashDto: ToonHashTagDto): Promise<any> {
    return this.toonService.registerHashtag(toonHashDto);
  }
}
