import { Nickname } from './nickname.entity';
import { Toon } from './toon.entity';
export declare class Storage {
    storageId: number;
    name: string;
    nickname: Nickname;
    toons: Toon[];
    save(nickname: Nickname): void;
}
