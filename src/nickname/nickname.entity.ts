import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['nickName']) // 닉네임 중복 여부 체크
export class Nickname extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickName: string;
}