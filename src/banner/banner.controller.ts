import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
    constructor(private bannerService: BannerService){}

    @ApiOperation({summary: "배너 생성"})
    @ApiBody({ type: BannerDto})
    @Post('/create') // 배너 생성
    @UsePipes(ValidationPipe)
    createBanner(@Body() bannerDto : BannerDto){
        return this.bannerService.createBanner(bannerDto);
    }

    @ApiOperation({summary: "Banner에 toon 추가 하기"})
    @Patch('/:bannerId/:toonId')
    updateBannerToons(@Param('bannerId', ParseIntPipe) bannerId: number, @Param('toonId', ParseIntPipe) toonId : number) {
        return this.bannerService.updateBannerToons(bannerId, toonId);
    }

    @ApiOperation({summary: "배너 전체 목록"})
    @Get('/list')
    getAllBanners(){
        return this.bannerService.getAllBanners();
    }

    @ApiOperation({summary: "Random Banner를 위한 인스타툰 목록 만들기"})
    @Get('/random')
    getAllToonsByRandom(){
        return this.bannerService.getAllToonsByRandom();
    }

    @ApiOperation({summary: "Bannder Id에 따른 인스타툰 목록 가져오기"})
    @Get('/:id')
    getAllToonsByBanner(@Param('id', ParseIntPipe) id: number){
        return this.bannerService.getAllToonsByBanner(id);
    }
}
