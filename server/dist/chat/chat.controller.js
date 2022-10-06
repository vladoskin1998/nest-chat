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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const auth_http_guard_1 = require("../auth/guard/auth-http.guard");
const chat_service_1 = require("./chat.service");
const chat_dto_1 = require("./dto/chat.dto");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async createChat(dto) {
        console.log('createChat--->', dto);
        const chatId = await this.chatService.newChat(dto);
        return { chatId };
    }
    async listChat(dto) {
        const userChatList = await this.chatService.listChat(dto);
        return userChatList.chats;
    }
};
__decorate([
    (0, common_1.Post)('create-chat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.ChatDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Post)('list-chat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.ListDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "listChat", null);
ChatController = __decorate([
    (0, common_1.UseGuards)(auth_http_guard_1.AuthHttpGuard),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map