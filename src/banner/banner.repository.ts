import { Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Banner } from "./banner.entity";
import { BannerDto } from "./dto/banner.dto";

@EntityRepository(Banner)
export class BannerRepository extends Repository<Banner> {
    async createBanner(bannerDto : BannerDto) {
        const { name } = bannerDto;
        const banner = this.create({ name });

        try{
            await this.save(banner);
            Logger.verbose('banner', JSON.stringify(banner));
        }catch(error){ // 일단 에러 표시
            Logger.verbose('code', error.code);   
        }
    }
}