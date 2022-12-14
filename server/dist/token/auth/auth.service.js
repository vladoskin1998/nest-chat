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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./user.model");
const bcrypt = require("bcrypt");
const token_service_1 = require("./token.service");
const token_model_1 = require("./token.model");
const enum_1 = require("../../enum/enum");
let AuthService = class AuthService {
    constructor(userModel, tokenModel, tokenService) {
        this.userModel = userModel;
        this.tokenModel = tokenModel;
        this.tokenService = tokenService;
    }
    async registration(userDto) {
        const { email } = userDto;
        const role = (userDto === null || userDto === void 0 ? void 0 : userDto.role) || enum_1.Roles.USER;
        const newUser = await this.userModel.findOrCreate({
            where: { email },
            defaults: Object.assign(Object.assign({}, userDto), { password: bcrypt.hashSync(userDto.password, 4) }),
        });
        if (!newUser[1]) {
            throw new common_1.HttpException('user already created', common_1.HttpStatus.BAD_REQUEST);
        }
        const tokens = await this.tokenService.createTokens({ email, role });
        await newUser[0].$create('tokens', tokens);
        return tokens;
    }
    async login(userDto) {
        const { email, password } = userDto;
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('can not find user', common_1.HttpStatus.BAD_REQUEST);
        }
        const checkPassword = bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new common_1.HttpException('bad password', common_1.HttpStatus.BAD_REQUEST);
        }
        const tokens = await this.tokenService.createTokens({
            email,
            role: user.role,
        });
        const oldToken = await user.$get('tokens');
        await oldToken.update(tokens);
        return tokens;
    }
    async refresh(refreshToken) {
        const token = await this.tokenModel.findOne({ where: { refreshToken } });
        if (!token) {
            throw new common_1.HttpException('refresh token is absent', common_1.HttpStatus.BAD_REQUEST);
        }
        const verifyToken = await this.tokenService.verifyToken(refreshToken);
        if (!verifyToken) {
            throw new common_1.HttpException('not authorization', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { email, role } = await token.$get('user');
        const newToken = await this.tokenService.createTokens({ email, role });
        await token.update(newToken);
        return newToken;
    }
    async delete(token) {
        const { email } = await this.tokenService.verifyToken(token);
        await this.userModel.destroy({ where: { email: email } });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.UserModel)),
    __param(1, (0, sequelize_1.InjectModel)(token_model_1.TokenModel)),
    __metadata("design:paramtypes", [Object, Object, token_service_1.TokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map