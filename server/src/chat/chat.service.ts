import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ChatModel } from './models/chat.model'
import { ChatUserModel } from './models/chat-user.model'
import { AuthModel } from 'src/auth/auth.model'
import { ChatDto, ListDto } from './dto/chat.dto'
import { Sequelize } from 'sequelize'
import { Op } from 'sequelize'

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatModel)
    private chatModel: typeof ChatModel,
    @InjectModel(ChatUserModel)
    private chatUserModel: typeof ChatUserModel,
    @InjectModel(AuthModel)
    private authModel: typeof AuthModel,
  ) {}

  async newChat({ usersId }: ChatDto): Promise<number> {
    try {
      const checkChatId = await this.chatUserModel.findAll({
        where: {
          userId: usersId,
        },
        group: ['chatId'],
        attributes: ['chatId', 'userId'],
        having: Sequelize.literal('count(chatId) > 1'),
      })

      console.log(checkChatId);
      
      if (checkChatId.length) {
        return checkChatId[0].chatId
      }

      const chat = await this.chatModel.create({})

      await Promise.all(
        usersId.map(async (userId) => {
          const user = await this.authModel.findByPk(userId)
          await user.$add('chats', chat, { through: this.chatUserModel })
        }),
      )

        
      //return { chatId email}

      return chat.id
    } catch (error) {
      throw new Error('SERVER ERROR')
    }
  }

  async listChat({ userId }) {
    try {
      const userChatList = await this.authModel.findByPk(userId, {
        include: [
          {
            model: ChatModel,
            through: {
              attributes: [],
            },
            include: [
              {
                model: AuthModel,
                where: {
                  id: {
                    [Op.ne]: userId,
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
}
