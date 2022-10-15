"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvent = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles["USER"] = "USER";
})(Roles = exports.Roles || (exports.Roles = {}));
var SocketEvent;
(function (SocketEvent) {
    SocketEvent["JOIN_ROOM"] = "join_room";
    SocketEvent["LEAVE_ROOM"] = "leave_room";
    SocketEvent["SEND_PRIVATE_MESSAGE"] = "send_private_message";
    SocketEvent["GET_PRIVATE_MESSAGE"] = "get_private_message";
    SocketEvent["NOTIFICATION"] = "notification";
    SocketEvent["NEW_CREATE_CHAT"] = "new_create_chat";
    SocketEvent["UPDATE_LIST_CHAT"] = "update_list_chat";
    SocketEvent["AUTH_SOCKET"] = "auth_socket";
})(SocketEvent = exports.SocketEvent || (exports.SocketEvent = {}));
//# sourceMappingURL=enum.js.map