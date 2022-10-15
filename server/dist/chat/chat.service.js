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
const user_model_1 = require("../user/user.model");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("sequelize");
const message_model_1 = require("./models/message.model");
let ChatService = class ChatService {
    constructor(chatModel, chatUserModel, userModel, messageModel) {
        this.chatModel = chatModel;
        this.chatUserModel = chatUserModel;
        this.userModel = userModel;
        this.messageModel = messageModel;
    }
    async newChat({ destinationUserId, sourceUserId, }) {
        try {
            const { email } = await this.userModel.findByPk(destinationUserId, {
                attributes: ['email'],
            });
            const checkChatId = await this.chatUserModel.findAll({
                where: {
                    userId: [destinationUserId, sourceUserId],
                },
                group: ['chatId'],
                attributes: ['chatId'],
                having: sequelize_2.Sequelize.literal('count(chatId) > 1'),
            });
            if (checkChatId.length) {
                return { email, chatId: checkChatId[0].chatId };
            }
            const chat = await this.chatModel.create({});
            await Promise.all([destinationUserId, sourceUserId].map(async (userId) => {
                const user = await this.userModel.findByPk(userId);
                await user.$add('chats', chat, { through: this.chatUserModel });
            }));
            return { email, chatId: chat.id };
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
    async listChat({ sourceUserId }) {
        try {
            const userChatList = await this.userModel.findByPk(sourceUserId, {
                include: [
                    {
                        model: chat_model_1.ChatModel,
                        through: {
                            attributes: [],
                        },
                        include: [
                            {
                                model: user_model_1.UserModel,
                                where: {
                                    id: {
                                        [sequelize_3.Op.ne]: sourceUserId,
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
    async getChatHistory(chatId) {
        try {
            const history = this.messageModel.findAll({
                where: {
                    chatId: chatId,
                },
                attributes: ['message', ['userId', 'id']],
            });
            return history;
        }
        catch (error) {
            throw new Error('SERVER ERROR');
        }
    }
    async addMessage(payload) {
        try {
            const { message, currentChatId, messageFromId } = payload;
            await this.messageModel.create({
                message: message,
                chatId: currentChatId,
                userId: messageFromId,
            });
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
    __param(2, (0, sequelize_1.InjectModel)(user_model_1.UserModel)),
    __param(3, (0, sequelize_1.InjectModel)(message_model_1.MessageModel)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map