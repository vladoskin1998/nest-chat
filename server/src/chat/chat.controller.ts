import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthHttpGuard } from '../auth/guard/auth-http.guard'
import { ChatService } from './chat.service'
import { ChatDto, ListDto } from './dto/chat.dto'

@UseGuards(AuthHttpGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create-chat')
  async createChat(@Body() dto: ChatDto) {
    console.log('createChat--->', dto)
    const chatId = await this.chatService.newChat(dto)
    return { chatId }
  }

  @Post('list-chat')
  async listChat(
    @Body() dto: ListDto,
    ) {
    const userChatList = await this.chatService.listChat(dto)
    return userChatList.chats
  }
}
