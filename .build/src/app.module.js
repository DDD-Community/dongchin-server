"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_config_1 = require("./configs/typeorm.config");
const nickname_module_1 = require("./nickname/nickname.module");
const auth_module_1 = require("./auth/auth.module");
const toon_module_1 = require("./toon/toon.module");
const banner_module_1 = require("./banner/banner.module");
const hashtag_module_1 = require("./hashtag/hashtag.module");
const storage_module_1 = require("./storage/storage.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nickname_module_1.NicknameModule,
            auth_module_1.AuthModule,
            toon_module_1.ToonModule,
            banner_module_1.BannerModule,
            hashtag_module_1.HashtagModule,
            storage_module_1.StorageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map