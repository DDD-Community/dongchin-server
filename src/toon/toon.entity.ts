import { Banner } from "src/banner/banner.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['url']) // url 중복 여부 체크
export class Toon extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    url: string;

    @Column()
    name: string;

    @ManyToOne(() => Banner, banner => banner.toons)
    banner: Banner;
}