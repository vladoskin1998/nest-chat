import { Body, Controller, Get, Post, UseGuards,Query } from '@nestjs/common'
import { AuthHttpGuard } from '../auth/guard/auth-http.guard'
import { ChatService } from './chat.service'
import { ChatDto, ListDto } from './dto/chat.dto'

@UseGuards(AuthHttpGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create-chat')
  async createChat(@Body() dto: ChatDto) {
  //  console.log('createChat--->', dto)
    const targetChat = await this.chatService.newChat(dto)
    return targetChat
  }

  @Post('list-chat')
  async listChat(
    @Body() dto: ListDto,
    ) {
    const userChatList = await this.chatService.listChat(dto)
    return userChatList?.chats
  }

  @Get('list-message')
  async getChatHistory(
    @Query('chatId')
    chatId: string
  ){
    const history = await this.chatService.getChatHistory(chatId)
    return history
  }
}
