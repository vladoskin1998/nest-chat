import { Server } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleMessage(client: any, payload: any): string;
}
