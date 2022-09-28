import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Banner } from '../entity/banner.entity';
import { BookMark } from '../entity/bookmark.entity';
import { HashTag } from '../entity/hashtag.entity';
import { Nickname } from '../entity/nickname.entity';
import { Recommended } from '../entity/recommended.entity';
import { Storage } from '../entity/storage.entity';
import { Toon } from '../entity/toon.entity';
import { ToonToBanner } from '../entity/toonToBanner.entity';
import * as dotenv from 'dotenv';
import path from 'path';
//클라우드환경으로 배포
dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : process.env.NODE_ENV === 'stage'
      ? '.stage.env'
      : '.development.env',
  ),
});
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Banner,
    HashTag,
    Nickname,
    Toon,
    ToonToBanner,
    Storage,
    BookMark,
    Recommended,
  ],
  synchronize: true,
  logging: true,
};
