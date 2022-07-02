import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Banner } from "./banner.entity";
import { Toon } from "./toon.entity";

@Entity()
export class ToonToBanner {
    @PrimaryGeneratedColumn()
    public id: number

    @ManyToOne(() => Toon, (toon) => toon.toonToBanners)
    public toon!: Toon

    @ManyToOne(() => Banner, banner => banner.toonToBanners)
    public banner!: Banner

    @CreateDateColumn()
    public createdAt!: Date

    @UpdateDateColumn()
    public updatedAt: Date
}