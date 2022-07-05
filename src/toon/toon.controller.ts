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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  responseFailDto,
  responseListDto,
  responseToonDto,
} from 'src/api/globalDTO';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonHashTagDto } from './dto/toon-hashtag.dto';
import { ToonService } from './toon.service';

@ApiTags('toons')
@Controller('toons')
export class ToonController {
  constructor(private toonService: ToonService) {}

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

  //GET 인툰 목록
  @ApiOperation({ summary: '인스타툰 목록' })
  @ApiResponse({ status: 200, description: '성공', type: responseListDto })
  @Get()
  getAllToons() {
    return this.toonService.getAllToons();
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
  @UsePipes(ValidationPipe)
  @Post('/hashtag')
  registerHashtag(@Body() toonHashDto: ToonHashTagDto): Promise<any> {
    return this.toonService.registerHashtag(toonHashDto);
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
  @Get('/popular-list')
  getPopularList(): Promise<any> {
    return this.toonService.getPopularList();
  }

  //GET 인스타툰 작품마다 좋아요 누르기
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
}
