import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { NicknameModule } from './nickname/nickname.module';
import { ToonModule } from './toon/toon.module';
import { BannerModule } from './banner/banner.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { StorageModule } from './storage/storage.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NicknameModule,
    ToonModule,
    BannerModule,
    HashtagModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
