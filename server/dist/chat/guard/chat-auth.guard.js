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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const enum_1 = require("../../enum/enum");
const token_service_1 = require("../../token/token.service");
const user_service_1 = require("../../user/user.service");
let ChatAuthGuard = class ChatAuthGuard {
    constructor(userService, tokenService, reflector) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        try {
            const prevEvent = this.reflector.get('SocketEvent', context.getHandler());
            const prevData = context.switchToWs().getData();
            const client = context.switchToWs().getClient();
            console.log(client.handshake.auth.accessToken);
            const accessToken = client.handshake.auth.accessToken;
            const payloadToken = await this.tokenService.verifyToken(accessToken);
            console.log(payloadToken instanceof Error);
            if (payloadToken instanceof Error) {
                client.emit(enum_1.SocketEvent.AUTH_SOCKET, prevEvent, prevData);
                return false;
            }
            const user = await this.userService.getUserByDto({ id: payloadToken.id });
            if (!user) {
                client.emit(enum_1.SocketEvent.AUTH_SOCKET, prevEvent, prevData);
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
ChatAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService,
        core_1.Reflector])
], ChatAuthGuard);
exports.ChatAuthGuard = ChatAuthGuard;
//# sourceMappingURL=chat-auth.guard.js.map