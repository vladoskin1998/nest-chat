import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { AuthModel } from './auth/auth.model'
import { AuthModule } from './auth/auth.module'
import { TokenModel } from './token/token.model'
import { ChatModule } from './chat/chat.module'
import { TokenModule } from './token/token.module'
import { ChatModel } from './chat/models/chat.model'
import { ChatUserModel } from './chat/models/chat-user.model'
import { MessageModel } from './chat/models/message.model'
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: 'nest',
      password: 'Vlados1998',
      database: 'testdb',
      models: [AuthModel, TokenModel, ChatModel, ChatUserModel, MessageModel],
      autoLoadModels: true,
    }),
    AuthModule,
    ChatModule,
    TokenModule,
    UserModule,
  ],
  exports: [ConfigModule],
})
export class AppModule {}

//console.log(process.env);
