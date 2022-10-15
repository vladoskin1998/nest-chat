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
exports.AuthWs = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../../token/token.service");
const websockets_1 = require("@nestjs/websockets");
let AuthWs = class AuthWs {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async canActivate(context) {
        var _a;
        try {
            const client = context.switchToWs().getClient();
            const accessToken = (_a = client.handshake) === null || _a === void 0 ? void 0 : _a.headers.authorization;
            const payload = await this.tokenService.verifyToken(accessToken);
            if (payload instanceof Error) {
                client.disconnect();
                throw new websockets_1.WsException("UNAUTHORIZED, Bad token");
            }
            console.log(payload);
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
AuthWs = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], AuthWs);
exports.AuthWs = AuthWs;
//# sourceMappingURL=auth-ws.guard.js.map