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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const enum_1 = require("../../enum/enum");
let TokenService = class TokenService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async createTokens({ email, role = enum_1.Roles.USER, }) {
        return {
            accessToken: this.jwtService.sign({ email, role }, {
                expiresIn: 335,
            }),
            refreshToken: this.jwtService.sign({ email, role }, {
                expiresIn: 535,
            }),
        };
    }
    async verifyToken(token) {
        try {
            const tokenPayload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            return tokenPayload;
        }
        catch (_a) {
            throw new common_1.HttpException('Bad token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map