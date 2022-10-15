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
exports.AuthHttpGuard = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../../token/token.service");
const user_service_1 = require("../../user/user.service");
let AuthHttpGuard = class AuthHttpGuard {
    constructor(tokenService, userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }
    canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const accessToken = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!accessToken) {
            throw new common_1.HttpException("Request don`t have authorization header", common_1.HttpStatus.BAD_REQUEST);
        }
        return this.authByAccessToken(accessToken);
    }
    async authByAccessToken(accessToken) {
        const payload = await this.tokenService.verifyToken(accessToken);
        if (payload instanceof Error) {
            throw new common_1.HttpException("UNAUTHORIZED, Bad token", common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.userService.getUserByDto({ id: payload.id });
        if (!user) {
            throw new common_1.HttpException("DB don`t find user", common_1.HttpStatus.BAD_REQUEST);
        }
        const userToken = await user.$get('tokens');
        return userToken.accessToken === accessToken;
    }
};
AuthHttpGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        user_service_1.UserService])
], AuthHttpGuard);
exports.AuthHttpGuard = AuthHttpGuard;
//# sourceMappingURL=auth-http.guard.js.map