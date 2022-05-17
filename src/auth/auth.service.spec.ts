import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "src/configs/typeorm.config";
import { AuthService } from "./auth.service"
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

class MockRepository {
    async findOne(uid: string) {
        const user: User = new User();
        user.uid = uid;
        return user;
    }
}

describe('AuthService', ()=> {
    let authService: AuthService;

    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([UserRepository]),
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: 'postgres',
                    database: 'Linco-app',
                    entities: [__dirname + '/../**/*.entity.{js,ts}'],
                    synchronize: true
                }),
            ],
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockRepository,
                },
            ],
        }).compile();
        authService = module.get<AuthService>(AuthService);
    });

    it('get User', async () => {
        const uid: string = "taeyong";
        const result = await authService.getNickNameByUid(uid);
        expect(result.uid).toBe(uid);
    })
});