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
exports.ListDto = exports.ChatDto = void 0;
const class_validator_1 = require("class-validator");
const sequelize_1 = require("sequelize");
const class_transformer_1 = require("class-transformer");
class ChatDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => sequelize_1.UUID),
    __metadata("design:type", Array)
], ChatDto.prototype, "usersId", void 0);
exports.ChatDto = ChatDto;
class ListDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => sequelize_1.UUID),
    __metadata("design:type", Number)
], ListDto.prototype, "userId", void 0);
exports.ListDto = ListDto;
//# sourceMappingURL=chat.dto.js.map