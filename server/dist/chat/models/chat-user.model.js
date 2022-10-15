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
exports.ChatUserModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../../user/user.model");
const chat_model_1 = require("./chat.model");
let ChatUserModel = class ChatUserModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], ChatUserModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.UserModel),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ChatUserModel.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.UserModel),
    __metadata("design:type", user_model_1.UserModel)
], ChatUserModel.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => chat_model_1.ChatModel),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ChatUserModel.prototype, "chatId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => chat_model_1.ChatModel),
    __metadata("design:type", chat_model_1.ChatModel)
], ChatUserModel.prototype, "chat", void 0);
ChatUserModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'chat_users' })
], ChatUserModel);
exports.ChatUserModel = ChatUserModel;
//# sourceMappingURL=chat-user.model.js.map