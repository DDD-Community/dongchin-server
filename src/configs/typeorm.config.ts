import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

//typeORM 일단 Local에서 생성
export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'Linco-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}