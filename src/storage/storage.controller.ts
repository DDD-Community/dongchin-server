import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StorageDto } from './dto/storage-create.dto';
import { StorageService } from './storage.service';
@ApiTags('storages')
@Controller('storages')
export class StorageController {
  constructor(private storageService: StorageService) {}
  //CREATE
  @ApiOperation({ summary: '보관함 생성 API' })
  @Post()
  createStorage(@Body(ValidationPipe) storageCreateDto: StorageDto) {
    const { name, nickName } = storageCreateDto;
    return this.storageService.createStorage(name, nickName);
  }

  //GET
  @ApiOperation({ summary: '보관함 조회 API' })
  @Get('/')
  getStorageByNickname(@Query('nickName') nickName: string) {
    return this.storageService.getStorageByNickname(nickName);
  }
}
