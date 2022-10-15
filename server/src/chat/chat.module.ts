import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ChatModel } from './models/chat.model'
import { ChatUserModel } from './models/chat-user.model'
import { MessageModel } from './models/message.model'
import { UserModel } from 'src/user/user.model'
import { UserModule } from 'src/user/user.module'
import { TokenModule } from 'src/token/token.module'

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([
      ChatModel,
      ChatUserModel,
      MessageModel,
      UserModel,
    ]),
    UserModule,
    TokenModule,
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
