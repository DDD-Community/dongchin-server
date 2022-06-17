import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToonDto } from './dto/toon-create.dto';
import { ToonRepository } from './toon.repository';


const baseLink = (username: string) => {
    return `https://instagram.com/${username}`;
};


@Injectable()
export class ToonService {
    constructor(
        @InjectRepository(ToonRepository)
        private toonRepository : ToonRepository,
    ){}

    // 인스타툰 링크주소 생성
    async createToon(toonDto : ToonDto) : Promise<{statusCode: number, ok: boolean, id?: number, error?: string}> {
        return this.toonRepository.createToon(toonDto);
    }

    // 인스타툰 전체 목록 가져오기
    async getAllToons(){
        const query = this.toonRepository.createQueryBuilder('toon');
        const toons = await query.getMany();
        return toons;
    }
}
