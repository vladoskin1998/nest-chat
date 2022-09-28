import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ChatModel } from './models/chat.model'
import { ChatUserModel } from './models/chat-user.model'
import { MessageModel } from './models/message.model'
import { AuthModel } from 'src/auth/auth.model'

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([
      ChatModel,
      ChatUserModel,
      MessageModel,
      AuthModel,
    ]),
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
