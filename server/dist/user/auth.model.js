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
exports.AuthModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const token_model_1 = require("../token/token.model");
const enum_1 = require("../enum/enum");
const chat_model_1 = require("../chat/models/chat.model");
const chat_user_model_1 = require("../chat/models/chat-user.model");
let AuthModel = class AuthModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], AuthModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], AuthModel.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], AuthModel.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(enum_1.Roles.USER),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM({ values: Object.values(enum_1.Roles) }) }),
    __metadata("design:type", String)
], AuthModel.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => token_model_1.TokenModel),
    __metadata("design:type", token_model_1.TokenModel)
], AuthModel.prototype, "tokens", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => chat_model_1.ChatModel, () => chat_user_model_1.ChatUserModel),
    __metadata("design:type", Array)
], AuthModel.prototype, "chats", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => chat_user_model_1.ChatUserModel),
    __metadata("design:type", Array)
], AuthModel.prototype, "chatUserId", void 0);
AuthModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users' })
], AuthModel);
exports.AuthModel = AuthModel;
//# sourceMappingURL=auth.model.js.map