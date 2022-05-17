import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from "typeorm";

// Database Table로 변환이 되는 Entity
@Entity()
@Unique(['nickName'])
export class User extends BaseEntity {
    @PrimaryColumn()
    uid: string;

    @Column()
    nickName: string;
}