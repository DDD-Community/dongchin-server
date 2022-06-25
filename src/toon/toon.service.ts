import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerRepository } from 'src/repository/banner.repository';
import { RelationDto } from './dto/relation.dto';
import { ToonDto } from './dto/toon-create.dto';
import { ToonRepository } from '../repository/toon.repository';
import { ToonToBannerRepository } from 'src/repository/toonToBanner.repository';
import { ToonToBanner } from 'src/entity/toonToBanner.entity';


@Injectable()
export class ToonService {
    constructor(
        @InjectRepository(ToonRepository)
        private toonRepository : ToonRepository,

        @InjectRepository(BannerRepository)
        private bannerRepository: BannerRepository,

        @InjectRepository(ToonToBannerRepository)
        private toonToBanenrRepository: ToonToBannerRepository
    ){}

    // 인스타툰 링크주소 생성
    async createToon(toonDto : ToonDto) : Promise<any> {
        return this.toonRepository.createToon(toonDto);
    }

    // 인스타툰 전체 목록 가져오기
    async getAllToons(){
        const query = this.toonRepository.createQueryBuilder('toon');
        const toons = await query.getMany();
        return Object.assign({
            data: toons,
            statusCode: 200,
            ok: true,
            message: "인스타툰 전체 리스트입니다."
        });
    }

    //인스타툰 배너에 등록하기
    async registerToBanner(relationDto: RelationDto): Promise<any> {
        try{
            const banner = await this.bannerRepository.findOne(relationDto.bannerId);
            const toon = await this.toonRepository.findOne(relationDto.toonId);
            const toonToBanner = new ToonToBanner();
            if(!toon || !banner){
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    ok:false,
                    message: "id가 존재하지 않습니다.",
                }))
            }
            toonToBanner.banner = banner;
            toonToBanner.toon = toon;
            const result = await this.toonToBanenrRepository.save(toonToBanner);
            Logger.verbose('banner', JSON.stringify(banner));
            Logger.verbose('toon', JSON.stringify(toon));
            Logger.verbose('result', JSON.stringify(result));
            return Object.assign({
                data: result,
                statusCode:201,
                ok:true,
                message:"인스타툰이 배너에 등록되었습니다."
            })
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }

    // 새로 등록된 인스타툰 API
    async getRecentToons(): Promise<any> {
        try{
            const toons = await this.toonRepository.createQueryBuilder('toon')
            .orderBy('toon.createAt', 'DESC')
            .limit(3)
            .getMany()

            if(!toons){
                throw new NotFoundException(Object.assign({
                    statusCode: 404,
                    ok: false,
                    message: "등록된 툰이 없습니다."
                }))
            }
            Logger.verbose('새로 등록된 인스타툰', JSON.stringify(toons));
            return Object.assign({
                data: toons,
                statusCode: 200,
                ok: true,
                message:"최근 등록된 인스타툰 목록"
            });
        }catch(NotFoundException){
            throw NotFoundException;
        }
    }
}
