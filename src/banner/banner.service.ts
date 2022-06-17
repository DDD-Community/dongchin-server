import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Toon } from 'src/toon/toon.entity';
import { ToonRepository } from 'src/toon/toon.repository';
import { Banner } from './banner.entity';
import { BannerRepository } from './banner.repository';
import { BannerDto } from './dto/banner.dto';

@Injectable()
export class BannerService {
    constructor(
        @InjectRepository(BannerRepository)
        private bannerRepository: BannerRepository,

        @InjectRepository(ToonRepository)
        private toonRepository: ToonRepository,
    ){}

    async createBanner(bannerDto : BannerDto){ // 배너 생성
        return this.bannerRepository.createBanner(bannerDto);
    }

    async getAllBanners(){ // 배너 목록 조회
        const query = this.bannerRepository.createQueryBuilder('banner');
        const banners = await query.getMany();
        console.log(banners);
        return banners;
    }

    async getAllToonsByRandom() { // 랜덤 배너 가져오기
        const toonQuery = this.toonRepository.createQueryBuilder('toon');
        const toons = await toonQuery.getMany();
        toons.sort(() => Math.random() - 0.5);
        
        const randomToons = toons.splice(0, 5);
        return randomToons;
    }

    async updateBannerToons(bannerId : number, toonId : number) { // bannerId에 toonId 1:N관계 만들기
        const banner : Banner = await this.bannerRepository.findOne(bannerId, {relations: ["toons"]});
        const toon : Toon = await this.toonRepository.findOne(toonId);
        try{
            banner.toons.push(toon);
            await this.bannerRepository.save(banner);
        }catch(error){
            console.log(error);
        }
    }

    async getAllToonsByBanner(id: number) {
        const query =  this.toonRepository // 인스타툰 테이블에서 bannerId에 따른 목록 가져오기
                            .createQueryBuilder()
                            .select("toon")
                            .from(Toon, "toon")
                            .where("toon.bannerId = :bannerId", { bannerId: id});
        const toons = await query.getMany();
        return toons;
    }
}
