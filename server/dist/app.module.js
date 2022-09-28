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
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const auth_model_1 = require("./auth/auth.model");
const auth_module_1 = require("./auth/auth.module");
const token_model_1 = require("./token/token.model");
const chat_module_1 = require("./chat/chat.module");
const token_module_1 = require("./token/token.module");
const chat_model_1 = require("./chat/models/chat.model");
const chat_user_model_1 = require("./chat/models/chat-user.model");
const message_model_1 = require("./chat/models/message.model");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: process.env.HOST_DB,
                port: Number(process.env.PORT_DB),
                username: 'nest',
                password: 'Vlados1998',
                database: 'testdb',
                models: [auth_model_1.AuthModel, token_model_1.TokenModel, chat_model_1.ChatModel, chat_user_model_1.ChatUserModel, message_model_1.MessageModel],
                autoLoadModels: true,
            }),
            auth_module_1.AuthModule,
            chat_module_1.ChatModule,
            token_module_1.TokenModule,
            user_module_1.UserModule,
        ],
        exports: [config_1.ConfigModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map