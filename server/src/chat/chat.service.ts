import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ChatModel } from './models/chat.model'
import { ChatUserModel } from './models/chat-user.model'
import { UserModel } from 'src/user/user.model'
import { ChatDto, ListDto } from './dto/chat.dto'
import { Sequelize } from 'sequelize'
import { Op } from 'sequelize'
import { TargetChat, AddMessage } from '../types/types'
import { MessageModel } from './models/message.model'

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatModel)
    private chatModel: typeof ChatModel,
    @InjectModel(ChatUserModel)
    private chatUserModel: typeof ChatUserModel,
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    @InjectModel(MessageModel)
    private messageModel: typeof MessageModel,
  ) {}

  async newChat({
    destinationUserId,
    sourceUserId,
  }: ChatDto): Promise<TargetChat> {
    try {
      const { email } = await this.userModel.findByPk(destinationUserId, {
        attributes: ['email'],
      })

      const checkChatId = await this.chatUserModel.findAll({
        where: {
          userId: [destinationUserId, sourceUserId],
        },
        group: ['chatId'],
        attributes: ['chatId'],
        having: Sequelize.literal('count(chatId) > 1'),
      })

      if (checkChatId.length) {
        return { email, chatId: checkChatId[0].chatId }
      }

      const chat = await this.chatModel.create({})

      await Promise.all(
        [destinationUserId, sourceUserId].map(async (userId) => {
          const user = await this.userModel.findByPk(userId)
          await user.$add('chats', chat, { through: this.chatUserModel })
        }),
      )

      //return { chatId email}

      return { email, chatId: chat.id }
    } catch (error) {
      throw new Error('SERVER ERROR')
    }
  }

  async listChat({ sourceUserId }: ListDto): Promise<UserModel> {
    try {
      const userChatList = await this.userModel.findByPk(sourceUserId, {
        include: [
          {
            model: ChatModel,
            through: {
              attributes: [],
            },
            include: [
              {
                model: UserModel,
                where: {
                  id: {
                    [Op.ne]: sourceUserId,
                  },
                },
                through: {
                  attributes: [],
                },
              },
            ],
            attributes: [['id', 'chatId']],
          },
        ],
        attributes: [],
      })

      return userChatList
    } catch (error) {
      throw new Error('SERVER ERROR')
    }
  }

  async getChatHistory(chatId: string) {
    try {
      const history = this.messageModel.findAll({
        where: {
          chatId: chatId,
        },
        attributes: ['message', ['userId', 'id']],
      })

      return history
    } catch (error) {
      throw new Error('SERVER ERROR')
    }
  }

  async addMessage(payload: AddMessage): Promise<void> {
    try {
      const { message, currentChatId, messageFromId } = payload

      await this.messageModel.create({
        message: message,
        chatId: currentChatId,
        userId: messageFromId,
      })
    } catch (error) {
      throw new Error('SERVER ERROR')
    }
  }
}
