import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { responseBannerDto, responseBannerListDto, responseFailDto, responseListDto } from 'src/api/globalDTO';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';

@ApiTags('banners')
@Controller('banners')
export class BannerController {
    constructor(private bannerService: BannerService){}

    @ApiOperation({summary: "배너 생성"})
    @ApiBody({ type: BannerDto})
    @ApiCreatedResponse({description:"배너 생성 성공", type: responseBannerDto})
    @Post('/create') // 배너 생성
    @UsePipes(ValidationPipe)
    createBanner(@Body() bannerDto : BannerDto){
        return this.bannerService.createBanner(bannerDto);
    }

    @ApiOperation({summary: "배너 전체 목록"})
    @ApiNotFoundResponse({description:"배너 가져오기 실패", type: responseFailDto})
    @ApiOkResponse({description:"배너 목록 가져오기 성공", type: responseBannerListDto})
    @Get('/list')
    getAllBanners(){
        return this.bannerService.getAllBanners();
    }

    @ApiOperation({summary: "랜덤 배너 API"})
    @ApiOkResponse({description:"랜덤 배너의 인스타툰 리스트", type: responseListDto})
    @Get('/random')
    getAllToonsByRandom(){
        return this.bannerService.getAllToonsByRandom();
    }

    @ApiOperation({summary: "Bannder Id에 따른 인스타툰 목록 가져오기"})
    @ApiNotFoundResponse({description: "배너 Id를 찾을 수 없습니다.", type: responseFailDto})
    @ApiOkResponse({description:"배너에 따른 인스타툰 리스트", type: responseListDto})
    @Get('/:id')
    getAllToonsByBanner(@Param('id', ParseIntPipe) id: number){
        return this.bannerService.getAllToonsByBanner(id);
    }
}
