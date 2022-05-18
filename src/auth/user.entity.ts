import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from "typeorm";

// Database Table로 변환이 되는 Entity
@Entity()
@Unique(['nickName']) // 닉네임 중복 여부 체크
export class User extends BaseEntity {
    @PrimaryColumn()
    uid: string;

    @Column()
    nickName: string;
}