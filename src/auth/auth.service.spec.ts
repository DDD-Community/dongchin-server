/*
auth Module의 Service를 테스트하기 위한 Unit Test 설정
*/
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service"
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

const mockRepository = () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AuthService', ()=> { // 실제 Database를 접근하여 unit Test를 실행하지 않기 위해 Mocking -> Repository Mocking
    let authService: AuthService;
    let userRepository: MockRepository<UserRepository>;

    beforeEach(async () => {
        const modules = await Test.createTestingModule({
            providers: [
            AuthService,
            {provide: getRepositoryToken(UserRepository), useValue: mockRepository() }
            ],
        }).compile();

        authService = modules.get<AuthService>(AuthService);
        userRepository = modules.get(getRepositoryToken(UserRepository));
    });

    describe('findById', () => {
        it('should fail if user doesn not exist', async () => {
            userRepository.findOne.mockResolvedValue(null);

            const result = await authService.getNickNameById(100000);
            expect(result.nickName).toBe("Not Found");
        });

        it('user exists', async() => {
            const user : User = new User();
            user.id = 1;
            user.nickName = "yongsHub";
            userRepository.findOne.mockResolvedValue(user); // mocking한 결과 유도
            const result = await authService.getNickNameById(1);

            expect(result).toEqual(user);
        })
    })
    it('be defined', () => {
        expect(authService).toBeDefined();
    })
});