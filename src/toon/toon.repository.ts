import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ToonDto } from "./dto/toon-create.dto";
import { Toon } from "./toon.entity";

@EntityRepository(Toon)
export class ToonRepository extends Repository<Toon> {
    async createToon(toonDto : ToonDto) : Promise<{statusCode: number, ok: boolean, error?: string}> {
        const { url, name } = toonDto;

        const instaToon = this.create({ url, name });

        try{
            await this.save(instaToon); // 인스타툰 링크/name 저장
            return Object.assign({
                statusCode: 201,
                ok: true,
                id: instaToon.id,
            });
        }catch(error){ // url 중복될 때 error
            console.log('error code', error.code);
            throw new UnauthorizedException(Object.assign({
                statusCode:401,
                ok: false,
                error: "url이 중복됩니다.",
            }))
        }
    }
}