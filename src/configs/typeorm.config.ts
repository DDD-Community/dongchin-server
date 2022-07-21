import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Banner } from 'src/entity/banner.entity';
import { BookMark } from 'src/entity/bookmark.entity';
import { HashTag } from 'src/entity/hashtag.entity';
import { Nickname } from 'src/entity/nickname.entity';
import { Recommended } from 'src/entity/recommended.entity';
import { Storage } from 'src/entity/storage.entity';
import { Toon } from 'src/entity/toon.entity';
import { ToonToBanner } from 'src/entity/toonToBanner.entity';

//클라우드환경으로 배포
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
