import { Toon } from "src/toon/toon.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banner extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Toon, toon => toon.banner, {cascade: ['insert', 'update']}) // 1 : N Relations
    toons: Toon[];
}