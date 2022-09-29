import { HashTag } from 'src/entity/hashtag.entity';
import { NicknameRepository } from 'src/repository/nickname.repository';
import { RecommnededRepository } from 'src/repository/recommended.repository';
import { StorageRepository } from 'src/repository/storage.repository';

export interface ToonFindAllOptions {
  input?: string;
  tagIds?: number[];
}

export type ToonConfig = {
  id?: number;
  authorName?: string;
  instagramId?: string;
  description?: string;
  imgUrl?: string;
  instagramUrl?: string;
  htmlUrl?: string;
  likeCount?: number;
  createAt?: Date;
  tag?: HashTag[];
};

export type ToonDetailConfig = {
  id?: number;
  authorName?: string;
  instagramId?: string;
  description?: string;
  imgUrl?: string;
  instagramUrl?: string;
  htmlUrl?: string;
  likeCount?: number;
  createAt?: Date;
  tag?: HashTag[];
  isRecommended?: boolean;
  storageIds?: number[];
};

export type RecommendConfig = {
  nickName?: string;
  toonId?: number;
  key?: boolean;
};

export type GetToonDetailConfig = {
  nickName: string;
  toonId: number;
  recommendedRepository: RecommnededRepository;
  nicknameRepository: NicknameRepository;
  storageRepository: StorageRepository;
};
