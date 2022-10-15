import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'
import { SocketEvent } from '../enum/enum'
import { SetMetadata, UseGuards } from '@nestjs/common'
import { ChatAuthGuard } from './guard/chat-auth.guard'
import { RoomType } from '../types/types'

@WebSocketGateway({
  cors:    {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private chatService: ChatService,

    ) {}


  @SubscribeMessage(SocketEvent.JOIN_ROOM)
  async joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() nameRooms: RoomType | RoomType[],
  ) {
    console.log(this.server.sockets.adapter.rooms);

    const rooms = Array.isArray(nameRooms) ? nameRooms.map(it => String(it)) : String(nameRooms)

    socket.join(rooms)
  }

  @SubscribeMessage(SocketEvent.LEAVE_ROOM)
  async leaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() nameRoom: RoomType,
  ) {
    console.log(this.server.sockets.adapter.rooms);
    socket.leave(String(nameRoom))
  }

  @SetMetadata("SocketEvent", SocketEvent.SEND_PRIVATE_MESSAGE)
  @UseGuards(ChatAuthGuard)
  @SubscribeMessage(SocketEvent.SEND_PRIVATE_MESSAGE)
  async handleMessage(
    @MessageBody() payload,
    @ConnectedSocket() socket: Socket,
  ) {

    const {
      message,
      currentChatId,
      messageFromId,
      sourceEmail,
      destinationEmail,
    } = payload

    await this.chatService.addMessage({message, currentChatId, messageFromId})

    socket.to(destinationEmail).emit(SocketEvent.NOTIFICATION, currentChatId, sourceEmail )

    socket.to(String(currentChatId)).emit(SocketEvent.GET_PRIVATE_MESSAGE, messageFromId, message)
  }

  @SubscribeMessage(SocketEvent.NEW_CREATE_CHAT)
  async updateChatList(
    @MessageBody() destinationEmail: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.to(destinationEmail).emit(SocketEvent.UPDATE_LIST_CHAT, destinationEmail)
  }
}
