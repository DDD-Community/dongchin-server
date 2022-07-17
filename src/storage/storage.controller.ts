import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageDto } from './dto/storage-create.dto';
import { StorageToonDto } from './dto/storage-toon.dto';
import { StorageService } from './storage.service';
@ApiTags('storages')
@Controller('storages')
export class StorageController {
  constructor(private storageService: StorageService) {}
  //POST
  @ApiOperation({ summary: '보관함 생성 API' })
  @ApiBody({ type: StorageDto })
  @Post()
  createStorage(@Body(ValidationPipe) storageCreateDto: StorageDto) {
    const { name, nickName } = storageCreateDto;
    return this.storageService.createStorage(name, nickName);
  }

  //POST
  @ApiOperation({ summary: '보관함 id에 toon 추가' })
  @ApiBody({ type: StorageToonDto })
  @Post('/toon')
  addToonByStorageId(@Body(ValidationPipe) storageToonDto: StorageToonDto) {
    const { storageId, toonId } = storageToonDto;
    return this.storageService.addToonByStorageId(storageId, toonId);
  }

  //GET
  @ApiOperation({ summary: '보관함 조회 API' })
  @ApiResponse({
    schema: {
      example: [
        {
          storageId: 2,
          name: '기본 보관함',
        },
        {
          storageId: 3,
          name: '연애 보관함',
        },
      ],
    },
  })
  @Get('/')
  getStorageByNickname(@Query('nickName') nickName: string) {
    return this.storageService.getStorageByNickname(nickName);
  }
}
