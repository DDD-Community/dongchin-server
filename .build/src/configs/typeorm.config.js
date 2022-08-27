"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const banner_entity_1 = require("src/entity/banner.entity");
const bookmark_entity_1 = require("src/entity/bookmark.entity");
const hashtag_entity_1 = require("src/entity/hashtag.entity");
const nickname_entity_1 = require("src/entity/nickname.entity");
const recommended_entity_1 = require("src/entity/recommended.entity");
const storage_entity_1 = require("src/entity/storage.entity");
const toon_entity_1 = require("src/entity/toon.entity");
const toonToBanner_entity_1 = require("src/entity/toonToBanner.entity");
exports.typeORMConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        banner_entity_1.Banner,
        hashtag_entity_1.HashTag,
        nickname_entity_1.Nickname,
        toon_entity_1.Toon,
        toonToBanner_entity_1.ToonToBanner,
        storage_entity_1.Storage,
        bookmark_entity_1.BookMark,
        recommended_entity_1.Recommended,
    ],
    synchronize: true,
    logging: true,
};
//# sourceMappingURL=typeorm.config.js.map