import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Nickname } from "../entity/nickname.entity";
import { NicknameRepository } from "../repository/nickname.repository";
import { NicknameService } from "./nickname.service";

const mockRepository = () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('NicknameService', ()=>{
    let nicknameService: NicknameService;
    let nickNameRepository: MockRepository<NicknameRepository>;

    beforeEach(async () => {
        const modules = await Test.createTestingModule({
            providers: [
            NicknameService,
            {provide: getRepositoryToken(NicknameRepository), useValue: mockRepository() }
            ],
        }).compile();

        nicknameService = modules.get<NicknameService>(NicknameService);
        nickNameRepository = modules.get(getRepositoryToken(NicknameRepository));
    });


    describe('findById', () => {
        it('should fail if user doesn not exist', async () => {
            nickNameRepository.findOne.mockResolvedValue(null);

            const result = await nicknameService.getNickNameById(100000);
            expect(result.nickName).toBe("닉네임을 찾을 수 없습니다.");
        });

        it('user exists', async() => {
            const user : Nickname = new Nickname();
            user.id = 1;
            user.nickName = "yongsHub";
            nickNameRepository.findOne.mockResolvedValue(user); // mocking한 결과 유도
            const result = await nicknameService.getNickNameById(1);

            expect(result).toEqual(user);
        })
    });


    describe('Change NickName', () => {
        it('should be Success', async() => {
            const user : Nickname = new Nickname();
            user.nickName = "taeyong";
            user.id = 1;
            nickNameRepository.save.mockResolvedValue(true);
            nickNameRepository.findOne.mockResolvedValue(user);
            
            const returnObject = Object.assign({
                statusCode: 200,
                ok: true,
            })
            const result = await nicknameService.updateNickName(1, {nickName: "taeyong"});

            expect(result).toEqual(returnObject);
        })
    })

    it('be defined', () => {
        expect(nicknameService).toBeDefined();
    })
})