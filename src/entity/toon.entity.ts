import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { HashTag } from "./hashtag.entity";
import { ToonToBanner } from "./toonToBanner.entity";

@Entity()
@Unique(['url']) // url 중복 여부 체크
export class Toon extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({description: "primary key", default:1})
    public id: number
    
    @Column()
    @ApiProperty({description: "인스타툰 url"})
    public url: string

    @Column()
    @ApiProperty({description:"인스타툰 id"})
    public name: string

    @CreateDateColumn({type: 'timestamp', default: 'NOW()'})
    public createAt: Date

    @OneToMany(() => ToonToBanner, toonToBanner => toonToBanner.toon)
    public toonToBanners!: ToonToBanner[]

    @ManyToMany(() => HashTag)
    @JoinTable()
    hashTags: HashTag[];
}