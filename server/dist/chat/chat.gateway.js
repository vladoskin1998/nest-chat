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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
const enum_1 = require("../enum/enum");
const common_1 = require("@nestjs/common");
const chat_auth_guard_1 = require("./guard/chat-auth.guard");
let ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async joinRoom(socket, nameRooms) {
        console.log(this.server.sockets.adapter.rooms);
        const rooms = Array.isArray(nameRooms) ? nameRooms.map(it => String(it)) : String(nameRooms);
        socket.join(rooms);
    }
    async leaveRoom(socket, nameRoom) {
        console.log(this.server.sockets.adapter.rooms);
        socket.leave(String(nameRoom));
    }
    async handleMessage(payload, socket) {
        const { message, currentChatId, messageFromId, sourceEmail, destinationEmail, } = payload;
        await this.chatService.addMessage({ message, currentChatId, messageFromId });
        socket.to(destinationEmail).emit(enum_1.SocketEvent.NOTIFICATION, currentChatId, sourceEmail);
        socket.to(String(currentChatId)).emit(enum_1.SocketEvent.GET_PRIVATE_MESSAGE, messageFromId, message);
    }
    async updateChatList(destinationEmail, socket) {
        socket.to(destinationEmail).emit(enum_1.SocketEvent.UPDATE_LIST_CHAT, destinationEmail);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SocketEvent.JOIN_ROOM),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SocketEvent.LEAVE_ROOM),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "leaveRoom", null);
__decorate([
    (0, common_1.SetMetadata)("SocketEvent", enum_1.SocketEvent.SEND_PRIVATE_MESSAGE),
    (0, common_1.UseGuards)(chat_auth_guard_1.ChatAuthGuard),
    (0, websockets_1.SubscribeMessage)(enum_1.SocketEvent.SEND_PRIVATE_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enum_1.SocketEvent.NEW_CREATE_CHAT),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "updateChatList", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: 'http://localhost:3000',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map