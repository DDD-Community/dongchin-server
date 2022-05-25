import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

//typeORM 일단 Local에서 생성
export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}