import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommonResponseDto } from 'src/api/common-response.dto';
import { StorageDto } from './dto/storage-create.dto';
import { StorageToonDto } from './dto/storage-toon.dto';
import { ToonsListDto } from './dto/toon-list.dto';
import { StorageService } from './storage.service';
@ApiTags('storages')
@Controller('storages')
export class StorageController {
  constructor(private storageService: StorageService) {}
  //POST
  @ApiOperation({ summary: '보관함 생성 API' })
  @ApiBody({ type: StorageDto })
  @ApiResponse({
    status: 201,
    schema: {
      example: new CommonResponseDto(201, true, '보관함이 생성되었습니다.'),
    },
  })
  @Post()
  createStorage(
    @Body(ValidationPipe) storageCreateDto: StorageDto,
  ): Promise<CommonResponseDto> {
    const { name, nickName } = storageCreateDto;
    return this.storageService.createStorage(name, nickName);
  }

  //POST
  @ApiOperation({ summary: '보관함 id에 toon 추가' })
  @ApiBody({ type: StorageToonDto })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: new CommonResponseDto(200, true, '보관함에 인스타툰 추가 성공'),
    },
  })
  @Post('/toon')
  addToonByStorageId(
    @Body(ValidationPipe) storageToonDto: StorageToonDto,
  ): Promise<CommonResponseDto> {
    const { storageId, toonId } = storageToonDto;
    return this.storageService.addToonByStorageId(storageId, toonId);
  }

  //GET
  @ApiOperation({ summary: '보관함 조회 API' })
  @ApiResponse({
    schema: {
      example: new CommonResponseDto(200, true, '조회 성공', [
        {
          storageName: '기본 보관함',
          storageId: 2,
          toonImg:
            'https://user-images.githubusercontent.com/52276038/177170605-dc8cecbe-fdcf-4252-a908-d829992c4c30.png',
          count: 2,
        },
        {
          storageName: '연애 보관함',
          storageId: 3,
          toonImg: ' ',
          count: 0,
        },
        {
          storageName: '랜덤 보관함',
          storageId: 4,
          toonImg: ' ',
          count: 0,
        },
      ]),
    },
  })
  @Get('/')
  getStorageByNickname(
    @Query('nickName') nickName: string,
  ): Promise<CommonResponseDto> {
    return this.storageService.getStorage(nickName);
  }

  @ApiOperation({ summary: '보관함 상세 조회 API' })
  @ApiResponse({
    schema: {
      example: new CommonResponseDto(200, true, '조회 성공', [
        {
          storageId: 1,
          name: '기본 보관함',
          toons: [
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
            },
            {
              id: 9,
              authorName: '펜낙',
              instagramId: 'pennac2016',
              description: '포롱이와 호롱이의 달콤살벌 연애 스토리',
              imgUrl:
                'https://user-images.githubusercontent.com/52276038/177170605-dc8cecbe-fdcf-4252-a908-d829992c4c30.png',
              instagramUrl: 'https://instagram.com/pennac2016',
              htmlUrl:
                'http://my-app-elb-251560380.ap-northeast-2.elb.amazonaws.com/toons/page?name=pennac2016',
              likeCount: 5,
              createAt: '2022-07-08T03:54:00.143Z',
            },
          ],
        },
      ]),
    },
  })
  @Get('/:id')
  getToonsByStorageId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommonResponseDto> {
    return this.storageService.getToonsByStorageId(id);
  }

  @ApiOperation({ summary: '보관함 삭제 API' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: new CommonResponseDto(200, true, '보관함이 삭제되었습니다.'),
    },
  })
  @Delete()
  deleteStorageById(
    @Query('storageId') storageId: number,
  ): Promise<CommonResponseDto> {
    return this.storageService.deleteStorageById(storageId);
  }

  @ApiOperation({ summary: '보관함에 들어있는 인스타툰 삭제 API' })
  @ApiBody({ type: ToonsListDto })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: new CommonResponseDto(200, true, '성공.'),
    },
  })
  @Delete('/:id')
  deleteToonsByStorageId(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) toonsIdDto: ToonsListDto,
  ): Promise<CommonResponseDto> {
    return this.storageService.deleteToonsByStorageId(id, toonsIdDto);
  }

  @ApiOkResponse({
    status: 200,
    schema: {
      example: new CommonResponseDto(
        200,
        true,
        '보관함이 이름이 변경되었습니다.',
      ),
    },
  })
  @ApiOperation({ summary: '보관함 이름 편집 API' })
  @Patch()
  updateStorageName(
    @Query('storageId', ParseIntPipe) storageId: number,
    @Query('name') name: string,
  ): Promise<CommonResponseDto> {
    return this.storageService.updateStorageName(storageId, name);
  }
}
