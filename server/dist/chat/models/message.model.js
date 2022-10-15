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
exports.MessageModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const chat_model_1 = require("./chat.model");
let MessageModel = class MessageModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], MessageModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], MessageModel.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => chat_model_1.ChatModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], MessageModel.prototype, "chatId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => chat_model_1.ChatModel),
    __metadata("design:type", chat_model_1.ChatModel)
], MessageModel.prototype, "chat", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], MessageModel.prototype, "userId", void 0);
MessageModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'message' })
], MessageModel);
exports.MessageModel = MessageModel;
//# sourceMappingURL=message.model.js.map