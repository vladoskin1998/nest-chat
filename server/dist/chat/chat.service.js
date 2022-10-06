"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const chat_model_1 = require("./models/chat.model");
const chat_user_model_1 = require("./models/chat-user.model");
const auth_model_1 = require("../auth/auth.model");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("sequelize");
let ChatService = class ChatService {
    constructor(chatModel, chatUserModel, authModel) {
        this.chatModel = chatModel;
        this.chatUserModel = chatUserModel;
        this.authModel = authModel;
    }
    async newChat({ usersId }) {
        try {
            const checkChatId = await this.chatUserModel.findAll({
                where: {
                    userId: usersId,
                },
                group: ['chatId'],
                attributes: ['chatId', 'userId'],
                having: sequelize_2.Sequelize.literal('count(chatId) > 1'),
            });
            console.log(checkChatId);
            if (checkChatId.length) {
                return checkChatId[0].chatId;
            }
            const chat = await this.chatModel.create({});
            await Promise.all(usersId.map(async (userId) => {
                const user = await this.authModel.findByPk(userId);
                await user.$add('chats', chat, { through: this.chatUserModel });
            }));
            return chat.id;
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
    async listChat({ userId }) {
        try {
            const userChatList = await this.authModel.findByPk(userId, {
                include: [
                    {
                        model: chat_model_1.ChatModel,
                        through: {
                            attributes: [],
                        },
                        include: [
                            {
                                model: auth_model_1.AuthModel,
                                where: {
                                    id: {
                                        [sequelize_3.Op.ne]: userId,
                                    },
                                },
                                through: {
                                    attributes: [],
                                },
                            },
                        ],
                        attributes: [['id', 'chatId']],
                    },
                ],
                attributes: [],
            });
            return userChatList;
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(chat_model_1.ChatModel)),
    __param(1, (0, sequelize_1.InjectModel)(chat_user_model_1.ChatUserModel)),
    __param(2, (0, sequelize_1.InjectModel)(auth_model_1.AuthModel)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map