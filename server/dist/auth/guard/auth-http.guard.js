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
exports.AuthHttpGuard = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../../token/token.service");
const sequelize_1 = require("@nestjs/sequelize");
const auth_model_1 = require("../auth.model");
let AuthHttpGuard = class AuthHttpGuard {
    constructor(tokenService, authModel) {
        this.tokenService = tokenService;
        this.authModel = authModel;
    }
    canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const tokenAccess = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!tokenAccess) {
            throw new common_1.HttpException("Request don`t have authorization header", common_1.HttpStatus.BAD_REQUEST);
        }
        return this.authByAccessToken(tokenAccess);
    }
    async authByAccessToken(token) {
        const payload = await this.tokenService.verifyToken(token);
        if (payload instanceof Error) {
            throw new common_1.HttpException("UNAUTHORIZED, Bad token", common_1.HttpStatus.UNAUTHORIZED);
        }
        const { email } = payload;
        const user = await this.authModel.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.HttpException("DB don`t find user", common_1.HttpStatus.BAD_REQUEST);
        }
        const userToken = await user.$get('tokens');
        return userToken.accessToken === token;
    }
};
AuthHttpGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(auth_model_1.AuthModel)),
    __metadata("design:paramtypes", [token_service_1.TokenService, Object])
], AuthHttpGuard);
exports.AuthHttpGuard = AuthHttpGuard;
//# sourceMappingURL=auth-http.guard.js.map