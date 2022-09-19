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
import {
  responseFailDto,
  responseListDto,
  responseToonDto,
} from '../api/globalDTO';
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
  @ApiResponse({ status: 200, description: '성공', type: responseListDto })
  @ApiNotFoundResponse({
    status: 404,
    description: '툰이 존재하지 않음',
    type: responseFailDto,
  })
  @Get('/recent')
  getRecentToons(): Promise<any> {
    return this.toonService.getRecentToons();
  }

  @ApiOperation({ summary: '실시간 인기툰 API' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: Object.assign({
        data: [
          {
            id: 10,
            authorName: '현이',
            instagramId: 'hyuny_beeny',
            description: '하고 싶은게 많은 시각디자인과 미대생 현이의 일상',
            imgUrl:
              'https://user-images.githubusercontent.com/52276038/177171189-c8f546fd-4865-4480-b438-bf026f6e4e1c.png',
            instagramUrl: 'https://instagram.com/hyuny_bee',
            htmlUrl:
              'http://my-app-elb-251560380.ap-northeast-2.elb.amazonaws.com/toons/page?name=hyuny_beeny',
            likeCount: 0,
            createAt: '2022-07-08T04:02:00.597Z',
            tag: [
              {
                id: 5,
                title: '드로잉',
                count: 2,
                category: 'drawing',
              },
            ],
          },
        ],
        statusCode: 200,
        ok: true,
        message: '조회 성공',
      }),
    },
  })
  @Get('/popular-list')
  getPopularList(): Promise<any> {
    return this.toonService.getPopularList();
  }
  //GET bookmark
  @ApiOperation({
    summary:
      '유저마다 좋아요 누른 툰과 북마크 툰 등록 API / 등록: key = true 등록 취소: key = false',
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        statusCode: 200,
        message: '좋아요 및 북마크 추가 또는 취소',
        success: true,
      },
    },
  })
  @Get('isLikeBookmark')
  addRecommendedWithBookmark(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('toonId', ParseIntPipe) toonId: number,
    @Query('key', ParseBoolPipe) key: boolean,
  ) {
    return this.toonService.addRecommendedWithBookmark(userId, toonId, key);
  }
  //GET 인툰 목록
  @ApiOperation({ summary: '인스타툰 전체 목록 API' })
  @ApiResponse({ status: 200, description: '성공', type: responseListDto })
  @Get()
  getAllToons() {
    return this.toonService.getAllToons();
  }

  @ApiOperation({ summary: '추천툰 API' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        data: [],
        statusCode: 200,
        ok: true,
        message: '추천 API 성공',
      },
    },
  })
  @Get('/random')
  getRandomToons() {
    return this.toonService.getRandomToons();
  }

  //GET 인툰 정보
  @ApiOperation({ summary: '인스타툰 상세 정보 API' })
  @ApiResponse({
    status: 200,
    schema: {
      example: Object.assign({
        data: [
          {
            id: 1,
            authorName: '현이',
            description: '하고 싶은게 많은 시각디자인과 미대생 현이의 일상',
            htmlUrl:
              'https://kb2x4imym4.execute-api.ap-northeast-2.amazonaws.com/dev/toons/page?name=hyuny_beeny',
            imgUrl:
              'https://user-images.githubusercontent.com/52276038/177171189-c8f546fd-4865-4480-b438-bf026f6e4e1c.png',
            instagramId: 'hyuny_beeny',
            instagramUrl: 'https://www.instagram.com/hyuny_beeny/',
            likeCount: 0,
            createAt: '2022-07-07T23:39:35.938Z',
            tag: [
              {
                id: 7,
                title: '대학생',
                count: 0,
                category: 'subject',
              },
              {
                id: 10,
                title: '디자이너',
                count: 0,
                category: 'subject',
              },
              {
                id: 15,
                title: '귀여운',
                count: 0,
                category: 'drawing',
              },
              {
                id: 27,
                title: '열정적인',
                count: 0,
                category: 'subject',
              },
            ],
            isRecommended: false,
          },
        ],
        statusCode: 200,
        ok: true,
        message: '성공',
      }),
    },
  })
  @Get('/:userId/:toonId')
  getToonById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('toonId', ParseIntPipe) toonId: number,
  ) {
    return this.toonService.getToonById(userId, toonId);
  }

  //PATCH 인스타툰 작품마다 좋아요 누르기
  @ApiOperation({
    summary:
      '인스타툰 작품에 좋아요/하트 API count수 증가: key=true 감소: key=false',
  })
  @Patch('/:id')
  makeHeartCount(
    @Param('id', ParseIntPipe) id: number,
    @Query('key', ParseBoolPipe) boolType: boolean,
  ): Promise<any> {
    return this.toonService.makeHeartCount(id, boolType);
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
