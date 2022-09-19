import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  responseBannerDto,
  responseBannerListDto,
  responseFailDto,
  responseListDto,
} from '../api/globalDTO';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';

@ApiTags('banners')
@Controller('dev/banners')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @ApiOperation({ summary: '배너 생성' })
  @ApiBody({ type: BannerDto })
  @ApiCreatedResponse({
    description: '배너 생성 성공',
    type: responseBannerDto,
  })
  @Post('/create') // 배너 생성
  @UsePipes(ValidationPipe)
  createBanner(@Body() bannerDto: BannerDto) {
    return this.bannerService.createBanner(bannerDto);
  }

  @ApiOperation({ summary: '배너 전체 목록' })
  @ApiNotFoundResponse({
    description: '배너 가져오기 실패',
    type: responseFailDto,
  })
  @ApiOkResponse({
    description: '배너 목록 가져오기 성공',
    type: responseBannerListDto,
  })
  @Get()
  getAllBanners() {
    return this.bannerService.getAllBanners();
  }

  @ApiOperation({ summary: '랜덤 배너 API' })
  @ApiOkResponse({
    description: '랜덤 배너의 인스타툰 리스트',
    schema: {
      example: {
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
                category: '그림체',
              },
            ],
          },
        ],
        statusCode: 200,
        ok: true,
        message: '랜덤으로 툰 가져오기 성공',
      },
    },
  })
  @Get('/random')
  getAllToonsByRandom() {
    return this.bannerService.getAllToonsByRandom();
  }

  @ApiOperation({ summary: 'Bannder Id에 따른 인스타툰 목록 가져오기' })
  @ApiNotFoundResponse({
    description: '배너 Id를 찾을 수 없습니다.',
    type: responseFailDto,
  })
  @ApiOkResponse({
    description: '배너에 따른 인스타툰 리스트',
    type: responseListDto,
  })
  @Get('/:id')
  getAllToonsByBanner(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.getAllToonsByBanner(id);
  }
}
