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
exports.ChatModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const auth_model_1 = require("../../auth/auth.model");
const chat_user_model_1 = require("./chat-user.model");
const message_model_1 = require("./message.model");
let ChatModel = class ChatModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], ChatModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => auth_model_1.AuthModel, () => chat_user_model_1.ChatUserModel),
    __metadata("design:type", Array)
], ChatModel.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => chat_user_model_1.ChatUserModel),
    __metadata("design:type", Array)
], ChatModel.prototype, "chatUserId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => message_model_1.MessageModel),
    __metadata("design:type", Array)
], ChatModel.prototype, "message", void 0);
ChatModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'chat' })
], ChatModel);
exports.ChatModel = ChatModel;
//# sourceMappingURL=chat.model.js.map