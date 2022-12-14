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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const enum_1 = require("../enum/enum");
const token_model_1 = require("./token.model");
const sequelize_1 = require("@nestjs/sequelize");
let TokenService = class TokenService {
    constructor(jwtService, configService, tokenModel) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.tokenModel = tokenModel;
    }
    async createTokens({ id, email, role = enum_1.Roles.USER, }) {
        return {
            accessToken: this.jwtService.sign({ id, email, role }, {
                expiresIn: 15,
            }),
            refreshToken: this.jwtService.sign({ id, email, role }, {
                expiresIn: 25,
            }),
        };
    }
    async verifyToken(token) {
        try {
            const result = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            return result;
        }
        catch (e) {
            return e;
        }
    }
    async findToken(tokens) {
        const token = await this.tokenModel.findOne({ where: tokens });
        if (!token) {
            throw new common_1.HttpException('refresh or access token is not define', common_1.HttpStatus.BAD_REQUEST);
        }
        return token;
    }
    async logoutUser(refreshToken) {
        await this.tokenModel.update({ accessToken: null, refreshToken: null }, { where: { refreshToken } });
    }
};
TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, sequelize_1.InjectModel)(token_model_1.TokenModel)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService, Object])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map