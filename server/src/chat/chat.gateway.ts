import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway({ cors: true })
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  @UseGuards()
  @SubscribeMessage('send_message')
  handleMessage(
  //  client: any, payload: any
    ): string {
  //  console.log("WebSocketGateway------>",client, payload);
    
    return 'Hello world!';
  }
}
