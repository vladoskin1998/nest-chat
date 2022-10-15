import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { RoomType } from '../types/types';
export declare class ChatGateway {
    private chatService;
    server: Server;
    constructor(chatService: ChatService);
    joinRoom(socket: Socket, nameRooms: RoomType | RoomType[]): Promise<void>;
    leaveRoom(socket: Socket, nameRoom: RoomType): Promise<void>;
    handleMessage(payload: any, socket: Socket): Promise<void>;
    updateChatList(destinationEmail: string, socket: Socket): Promise<void>;
}
