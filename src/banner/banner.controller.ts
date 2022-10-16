import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responseBannerDto } from '../api/globalDTO';
import { BannerService } from './banner.service';
import { BannerCredentialDto } from './dto/banner-create.dto';
import { BannerListDto } from './dto/banner-list.dto';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @ApiOperation({ summary: '배너 생성' })
  @ApiBody({ type: BannerCredentialDto })
  @ApiCreatedResponse({
    description: '배너 생성 성공',
    type: responseBannerDto,
  })
  @Post('/create') // 배너 생성
  @UsePipes(ValidationPipe)
  createBanner(@Body() bannerDto: BannerCredentialDto) {
    return this.bannerService.createBanner(bannerDto);
  }

  @ApiOperation({ summary: '고양이 배너' })
  @ApiOkResponse({
    description: '고양이 배너 가져오기 성공',
    type: BannerListDto,
  })
  @Get('/cat')
  getToonsByCatBanner() {
    return this.bannerService.getToonsByCatBanner();
  }

  @ApiOperation({ summary: '직장인 배너' })
  @ApiOkResponse({
    description: '직장인 배너 가져오기 성공',
    type: BannerListDto,
  })
  @Get('/salaryman')
  getToonsBySalaryBanner() {
    return this.bannerService.getToonsBySalaryBanner();
  }

  @ApiOperation({ summary: '힐링 배너' })
  @ApiOkResponse({
    description: '힐링 배너 가져오기 성공',
    type: BannerListDto,
  })
  @Get('/healing')
  getToonsByHealingBanner() {
    return this.bannerService.getToonsByHealingBanner();
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
  @Get('/random/:nickName')
  getAllToonsByRandom(@Param('nickName') nickName: string) {
    return this.bannerService.getAllToonsByRandom(nickName);
  }
}
