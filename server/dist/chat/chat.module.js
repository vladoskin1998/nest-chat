"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat.gateway");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const chat_model_1 = require("./models/chat.model");
const chat_user_model_1 = require("./models/chat-user.model");
const message_model_1 = require("./models/message.model");
const user_model_1 = require("../user/user.model");
const user_module_1 = require("../user/user.module");
const token_module_1 = require("../token/token.module");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            sequelize_1.SequelizeModule.forFeature([
                chat_model_1.ChatModel,
                chat_user_model_1.ChatUserModel,
                message_model_1.MessageModel,
                user_model_1.UserModel,
            ]),
            user_module_1.UserModule,
            token_module_1.TokenModule,
        ],
        providers: [chat_gateway_1.ChatGateway, chat_service_1.ChatService],
        controllers: [chat_controller_1.ChatController],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map